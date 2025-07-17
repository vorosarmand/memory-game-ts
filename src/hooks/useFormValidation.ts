import { useState, useCallback } from "react";
import { IValidationInput } from "../types/IValidationInput";

export const useFormValidation = <T extends Record<string, any>>(
  initialData: T,
  validationRules: IValidationInput[],
) => {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    Object.keys(initialData).reduce(
      (acc, key) => ({ ...acc, [key]: null }),
      {} as Record<keyof T, string | null>,
    ),
  );

  const validateField = useCallback(
    (key: keyof T, value: any) => {
      const rule = validationRules.find((v) => v.key === key && v.rule(value));
      setErrors((prev) => ({
        ...prev,
        [key]: rule ? rule.message : null,
      }));
    },
    [validationRules],
  );

  const updateField = useCallback(
    (key: keyof T, value: any) => {
      setData((prev) => ({ ...prev, [key]: value }));
      validateField(key, value);
    },
    [validateField],
  );

  const isValid = Object.values(errors).every((error) => error === null);

  return { data, errors, updateField, isValid };
};
