import { useMemo } from "react";
import {
  ALLOWED_BAD_GUESSES_MAX,
  ALLOWED_BAD_GUESSES_MIN,
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NUMBER_OF_PAIRS_MAX,
  NUMBER_OF_PAIRS_MIN,
  TOTAL_TIME_MAX,
  TOTAL_TIME_MIN,
} from "../consts";
import { IValidationInput } from "../types/IValidationInput";

export const useSettingsValidationRules = (): IValidationInput[] => {
  return useMemo(
    () => [
      {
        key: "name",
        rule: (value: string) =>
          String(value).length < NAME_MIN_LENGTH ||
          String(value).length > NAME_MAX_LENGTH,
        message: `Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters long.`,
      },
      {
        key: "numberOfCards",
        rule: (value: number) =>
          Number(value) < NUMBER_OF_PAIRS_MIN ||
          Number(value) > NUMBER_OF_PAIRS_MAX,
        message: `Number of pairs must be between ${NUMBER_OF_PAIRS_MIN} and ${NUMBER_OF_PAIRS_MAX}`,
      },
      {
        key: "totalTime",
        rule: (value: number) =>
          Number(value) < TOTAL_TIME_MIN || Number(value) > TOTAL_TIME_MAX,
        message: `Total time must be between ${TOTAL_TIME_MIN} and ${TOTAL_TIME_MAX}`,
      },
      {
        key: "allowedBadGuesses",
        rule: (value: number) =>
          Number(value) < ALLOWED_BAD_GUESSES_MIN ||
          Number(value) > ALLOWED_BAD_GUESSES_MAX,
        message: `Allowed bad guesses must be between ${ALLOWED_BAD_GUESSES_MIN} and ${ALLOWED_BAD_GUESSES_MAX}`,
      },
    ],
    [],
  );
};
