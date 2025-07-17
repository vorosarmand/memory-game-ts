import { FC, useEffect } from "react";
import { useFormValidation } from "../hooks/useFormValidation";
import { useSettingsValidationRules } from "../hooks/useSettingsValidationRules";
import {
  setAllowedBadGuesses as setAllowedBadGuessesAction,
  setNumberOfCards as setNumberOfCardsAction,
  setTotalTime as setTotalTimeAction,
  setUsername,
} from "../state/configSlice";
import { resetGame, setGamePaused } from "../state/gameSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import Button from "./Button";
import Input from "./Input";
import Popup from "./Popup";

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

  const { data, errors, updateField, isValid } = useFormValidation(
    {
      name: config.username,
      numberOfCards: config.number_of_cards,
      totalTime: config.total_time,
      allowedBadGuesses: config.allowed_bad_guesses,
    },
    useSettingsValidationRules(),
  );

  const dispatch = useAppDispatch();

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

  useEffect(() => console.log(errors), [errors]);

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
            onChange={(e) => updateField("name", e.target.value)}
            hasError={errors.name !== null}
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
              updateField("numberOfCards", Number(e.target.value))
            }
            hasError={errors.numberOfCards !== null}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="number_of_pairs" className="font-bold">
            Countdown time (sec.)
          </label>
          <Input
            type="number"
            value={data.totalTime}
            onChange={(e) => updateField("totalTime", Number(e.target.value))}
            hasError={errors.totalTime !== null}
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
              updateField("allowedBadGuesses", Number(e.target.value))
            }
            hasError={errors.allowedBadGuesses !== null}
          />
        </div>
        <div className="flex w-full items-center justify-center">
          {Object.values(errors).find((v) => v !== null) && (
            <span className="text-md px-6 text-center font-black text-[#FF3F56]">
              {Object.values(errors).find((v) => v !== null)}
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
