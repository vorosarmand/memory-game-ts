import { FC, useState } from "react";
import Button from "./Button";
import Popup from "./Popup";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { resetGame, setGamePaused } from "../state/gameSlice";
import {
  setNumberOfCards as setNumberOfCardsAction,
  setTotalTime as setTotalTimeAction,
  setUsername,
} from "../state/configSlice";
import { IValidationInput } from "../types/IValidationInput";
import {
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

  const [name, setName] = useState<IValidationInput>({
    value: config.username,
    error: null,
  });
  const [numberOfCards, setNumberOfCards] = useState<IValidationInput>({
    value: config.number_of_cards,
    error: null,
  });
  const [totalTime, setTotalTime] = useState<IValidationInput>({
    value: config.total_time,
    error: null,
  });

  const handleSetName = (value: string) => {
    setName({
      value,
      error:
        value.length < NAME_MIN_LENGTH || value.length > NAME_MAX_LENGTH
          ? `Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters long.`
          : null,
    });
  };

  const handleSetNumberOfCards = (value: number) => {
    setNumberOfCards({
      value,
      error:
        value < NUMBER_OF_PAIRS_MIN || value > NUMBER_OF_PAIRS_MAX
          ? `Number of pairs must be between ${NUMBER_OF_PAIRS_MIN} and ${NUMBER_OF_PAIRS_MAX}`
          : null,
    });
  };

  const handleSetTotalTime = (value: number) => {
    setTotalTime({
      value,
      error:
        value < TOTAL_TIME_MIN || value > TOTAL_TIME_MAX
          ? `Total time must be between ${TOTAL_TIME_MIN} and ${TOTAL_TIME_MAX}`
          : null,
    });
  };

  const handleStartGame = () => {
    dispatch(setNumberOfCardsAction(numberOfCards.value));
    dispatch(setTotalTimeAction(totalTime.value));
    dispatch(setUsername(name.value));
    dispatch(resetGame(numberOfCards.value));
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
            value={name.value}
            onChange={(e) => handleSetName(e.target.value)}
            hasError={!!name.error}
            className="w-[150px]"
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="number_of_pairs" className="font-bold">
            Number of pair of cards
          </label>
          <Input
            type="number"
            value={numberOfCards.value}
            onChange={(e) => handleSetNumberOfCards(Number(e.target.value))}
            hasError={!!numberOfCards.error}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="number_of_pairs" className="font-bold">
            Countdown time (sec.)
          </label>
          <Input
            type="number"
            value={totalTime.value}
            onChange={(e) => handleSetTotalTime(Number(e.target.value))}
            hasError={!!totalTime.error}
          />
        </div>
        <div className="flex w-full items-center justify-center">
          {numberOfCards.error !== null ? (
            <span className="text-md px-6 text-center font-black text-[#FF3F56]">
              {numberOfCards.error}
            </span>
          ) : totalTime.error !== null ? (
            <span className="text-md px-6 text-center font-black text-[#FF3F56]">
              {totalTime.error}
            </span>
          ) : name.error !== null ? (
            <span className="text-md px-6 text-center font-black text-[#FF3F56]">
              {name.error}
            </span>
          ) : null}
        </div>
        <div className="relative flex flex-col gap-[15px]">
          <Button text="Let's play!" onClick={handleStartGame} />
        </div>
      </div>
    </Popup>
  );
};

export default SettingsPopup;
