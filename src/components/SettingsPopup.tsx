import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import Button from "./Button";
import Popup from "./Popup";
import {
  setNumberOfCards as setNumberOfCardsAction,
  setTotalTime as setTotalTimeAction,
} from "../state/configSlice";
import { resetGame } from "../state/gameSlice";
import {
  NUMBER_OF_PAIRS_MAX,
  NUMBER_OF_PAIRS_MIN,
  TOTAL_TIME_MAX,
  TOTAL_TIME_MIN,
} from "../consts";
import Input from "./Input";
import { IValidationInput } from "../types/IValidationInput";

interface SettingsPopupProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SettingsPopup: FC<SettingsPopupProps> = ({ isOpen, setIsOpen }) => {
  const config = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const [numberOfCards, setNumberOfCards] = useState<IValidationInput>({
    value: config.number_of_cards,
    error: null,
  });
  const [totalTime, setTotalTime] = useState<IValidationInput>({
    value: config.total_time,
    error: null,
  });

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

  const handleSaveSettings = () => {
    dispatch(setNumberOfCardsAction(numberOfCards.value));
    dispatch(setTotalTimeAction(totalTime.value));
    dispatch(resetGame(numberOfCards.value));
    setIsOpen(false);
  };

  return (
    <Popup isOpen={isOpen} setIsOpen={setIsOpen} title="Game settings">
      <div className="flex flex-col gap-[15px]">
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
          ) : null}
        </div>
        <Button
          text="Save settings"
          onClick={handleSaveSettings}
          disabled={numberOfCards.error !== null || totalTime.error !== null}
        />
      </div>
    </Popup>
  );
};

export default SettingsPopup;
