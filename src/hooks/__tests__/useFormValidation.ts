import { renderHook, act } from "@testing-library/react";
import { useFormValidation } from "../useFormValidation";
import { IValidationInput } from "../../types/IValidationInput";

describe("useFormValidation", () => {
  const mockValidationRules: IValidationInput[] = [
    {
      key: "name",
      rule: (value: string) => value.length < 2 || value.length > 10,
      message: "Name must be between 2 and 10 characters",
    },
    {
      key: "age",
      rule: (value: number) => value < 18 || value > 100,
      message: "Age must be between 18 and 100",
    },
  ];

  const initialData = {
    name: "John",
    age: 25,
  };

  it("should initialize with provided data and no errors", () => {
    const { result } = renderHook(() =>
      useFormValidation(initialData, mockValidationRules),
    );

    expect(result.current.data).toEqual(initialData);
    expect(result.current.errors).toEqual({
      name: null,
      age: null,
    });
    expect(result.current.isValid).toBe(true);
  });

  it("should update field data when updateField is called", () => {
    const { result } = renderHook(() =>
      useFormValidation(initialData, mockValidationRules),
    );

    act(() => {
      result.current.updateField("name", "Jane");
    });

    expect(result.current.data.name).toBe("Jane");
    expect(result.current.data.age).toBe(25);
  });

  it("should validate field and set error when validation fails", () => {
    const { result } = renderHook(() =>
      useFormValidation(initialData, mockValidationRules),
    );

    act(() => {
      result.current.updateField("name", "A"); // Too short
    });

    expect(result.current.data.name).toBe("A");
    expect(result.current.errors.name).toBe(
      "Name must be between 2 and 10 characters",
    );
    expect(result.current.isValid).toBe(false);
  });

  it("should clear error when validation passes", () => {
    const { result } = renderHook(() =>
      useFormValidation({ name: "A", age: 25 }, mockValidationRules),
    );

    // Initially invalid
    act(() => {
      result.current.updateField("name", "A");
    });
    expect(result.current.errors.name).toBe(
      "Name must be between 2 and 10 characters",
    );

    // Fix the validation
    act(() => {
      result.current.updateField("name", "Alice");
    });

    expect(result.current.errors.name).toBe(null);
    expect(result.current.isValid).toBe(true);
  });

  it("should handle multiple field validations", () => {
    const { result } = renderHook(() =>
      useFormValidation(initialData, mockValidationRules),
    );

    act(() => {
      result.current.updateField("name", "VeryLongNameThatExceedsLimit");
      result.current.updateField("age", 15);
    });

    expect(result.current.errors.name).toBe(
      "Name must be between 2 and 10 characters",
    );
    expect(result.current.errors.age).toBe("Age must be between 18 and 100");
    expect(result.current.isValid).toBe(false);
  });

  it("should return true for isValid when all fields are valid", () => {
    const { result } = renderHook(() =>
      useFormValidation(initialData, mockValidationRules),
    );

    act(() => {
      result.current.updateField("name", "Alice");
      result.current.updateField("age", 30);
    });

    expect(result.current.isValid).toBe(true);
  });

  it("should handle fields without validation rules", () => {
    const dataWithExtraField = { ...initialData, email: "test@example.com" };

    const { result } = renderHook(() =>
      useFormValidation(dataWithExtraField, mockValidationRules),
    );

    act(() => {
      result.current.updateField("email", "new@example.com");
    });

    expect(result.current.data.email).toBe("new@example.com");
    expect(result.current.errors.email).toBe(null);
  });

  it("should update validation rules when they change", () => {
    const newRules: IValidationInput[] = [
      {
        key: "name",
        rule: (value: string) => value.length < 5,
        message: "Name must be at least 5 characters",
      },
    ];

    const { result, rerender } = renderHook(
      ({ rules }) => useFormValidation(initialData, rules),
      { initialProps: { rules: mockValidationRules } },
    );

    act(() => {
      result.current.updateField("name", "Bob");
    });
    expect(result.current.errors.name).toBe(null);

    // Update rules
    rerender({ rules: newRules });

    act(() => {
      result.current.updateField("name", "Bob");
    });
    expect(result.current.errors.name).toBe(
      "Name must be at least 5 characters",
    );
  });
});
