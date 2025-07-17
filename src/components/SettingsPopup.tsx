import { FC, useEffect, useState } from "react";
import Button from "./Button";
import Popup from "./Popup";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { resetGame, setGamePaused } from "../state/gameSlice";
import {
  setNumberOfCards as setNumberOfCardsAction,
  setTotalTime as setTotalTimeAction,
  setAllowedBadGuesses as setAllowedBadGuessesAction,
  setUsername,
} from "../state/configSlice";
import { IValidationInput } from "../types/IValidationInput";
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
import Input from "./Input";

interface SettingsPopupProps {
  isOpen: boolean;
  hideCloseButton?: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SettingsPopup: FC<SettingsPopupProps> = ({
  isOpen,
  hideCloseButton,
  setIsOpen,
}) => {
  const config = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const [data, setData] = useState({
    name: config.username,
    numberOfCards: config.number_of_cards,
    totalTime: config.total_time,
    allowedBadGuesses: config.allowed_bad_guesses,
  });

  const [error, setError] = useState({
    name: null,
    numberOfCards: null,
    totalTime: null,
    allowedBadGuesses: null,
  });

  const handleSetData = (key: string, value: number | string) => {
    setData((prev) => ({ ...prev, [key]: value }));
    handleSetError(key, value);
  };

  useEffect(() => console.dir(error), [error]);

  const handleSetError = (key: string, value: number | string) => {
    const validation = [
      {
        key: "name",
        rule:
          String(value).length < NAME_MIN_LENGTH ||
          String(value).length > NAME_MAX_LENGTH,
        message: `Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters long.`,
      },
      {
        key: "numberOfCards",
        rule:
          Number(value) < NUMBER_OF_PAIRS_MIN ||
          Number(value) > NUMBER_OF_PAIRS_MAX,
        message: `Number of pairs must be between ${NUMBER_OF_PAIRS_MIN} and ${NUMBER_OF_PAIRS_MAX}`,
      },
      {
        key: "totalTime",
        rule: Number(value) < TOTAL_TIME_MIN || Number(value) > TOTAL_TIME_MAX,
        message: `Total time must be between ${TOTAL_TIME_MIN} and ${TOTAL_TIME_MAX}`,
      },
      {
        key: "allowedBadGuesses",
        rule:
          Number(value) < ALLOWED_BAD_GUESSES_MIN ||
          Number(value) > ALLOWED_BAD_GUESSES_MAX,
        message: `Allowed bad guesses must be between ${ALLOWED_BAD_GUESSES_MIN} and ${ALLOWED_BAD_GUESSES_MAX}`,
      },
    ];
    const error = validation.find((v) => v.key === key && v.rule);
    setError((prev) => ({
      ...prev,
      [key]: error ? error.message : null,
    }));
  };

  const handleStartGame = () => {
    dispatch(setNumberOfCardsAction(data.numberOfCards));
    dispatch(setTotalTimeAction(data.totalTime));
    dispatch(setAllowedBadGuessesAction(data.allowedBadGuesses));
    dispatch(setUsername(data.name));
    dispatch(resetGame(data.numberOfCards));
    dispatch(setGamePaused(false));
    setIsOpen(false);
  };

  const handleClose = () => {
    dispatch(setGamePaused(false));
    setIsOpen(false);
  };

  return (
    <Popup
      isOpen={isOpen}
      setIsOpen={handleClose}
      title="Game settings"
      hideCloseButton={hideCloseButton}
    >
      <div className="flex flex-col gap-[15px]">
        <div className="flex items-center justify-between">
          <label htmlFor="number_of_pairs" className="font-bold">
            Your name
          </label>
          <Input
            type="text"
            value={data.name}
            onChange={(e) => handleSetData("name", e.target.value)}
            hasError={error.name !== null}
            className="w-[150px]"
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="number_of_pairs" className="font-bold">
            Number of pair of cards
          </label>
          <Input
            type="number"
            value={data.numberOfCards}
            onChange={(e) =>
              handleSetData("numberOfCards", Number(e.target.value))
            }
            hasError={error.numberOfCards !== null}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="number_of_pairs" className="font-bold">
            Countdown time (sec.)
          </label>
          <Input
            type="number"
            value={data.totalTime}
            onChange={(e) => handleSetData("totalTime", Number(e.target.value))}
            hasError={error.totalTime !== null}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="number_of_pairs" className="font-bold">
            Allowed bad guesses
          </label>
          <Input
            type="number"
            value={data.allowedBadGuesses}
            onChange={(e) =>
              handleSetData("allowedBadGuesses", Number(e.target.value))
            }
            hasError={error.allowedBadGuesses !== null}
          />
        </div>
        <div className="flex w-full items-center justify-center">
          {Object.values(error).find((v) => v !== null) && (
            <span className="text-md px-6 text-center font-black text-[#FF3F56]">
              {Object.values(error).find((v) => v !== null)}
            </span>
          )}
        </div>
        <div className="relative flex flex-col gap-[15px]">
          <Button text="Let's play!" onClick={handleStartGame} />
        </div>
      </div>
    </Popup>
  );
};

export default SettingsPopup;
