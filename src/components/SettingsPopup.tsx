import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import Button from "./Button";
import Popup from "./Popup";
import {
  setNumberOfCards as setNumberOfCardsAction,
  setTotalTime as setTotalTimeAction,
} from "../state/configSlice";
import { resetGame } from "../state/gameSlice";

interface SettingsPopupProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SettingsPopup: FC<SettingsPopupProps> = ({ isOpen, setIsOpen }) => {
  const config = useAppSelector((state) => state.config);
  const dispatch = useAppDispatch();

  const [numberOfCards, setNumberOfCards] = useState(config.number_of_cards);
  const [totalTime, setTotalTime] = useState(config.total_time);

  const handleSaveSettings = () => {
    dispatch(setNumberOfCardsAction(numberOfCards));
    dispatch(setTotalTimeAction(totalTime));
    dispatch(resetGame(numberOfCards));
    setIsOpen(false);
  };

  return (
    <Popup isOpen={isOpen} setIsOpen={setIsOpen} title="Game settings">
      <div className="flex flex-col gap-[15px]">
        <div className="flex items-center justify-between">
          <label htmlFor="number_of_pairs" className="font-bold">
            Number of pair of cards
          </label>
          <input
            type="number"
            value={numberOfCards}
            onChange={(e) => setNumberOfCards(Number(e.target.value))}
            className="h-[41px] w-[50px] rounded-[10px] border border-[#D5D5D5] text-center text-lg font-medium focus:outline-[#FF3F56]"
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="number_of_pairs" className="font-bold">
            Countdown time (sec.)
          </label>
          <input
            type="number"
            value={totalTime}
            onChange={(e) => setTotalTime(Number(e.target.value))}
            className="h-[41px] w-[50px] rounded-[10px] border border-[#D5D5D5] text-center text-lg font-medium focus:outline-[#FF3F56]"
          />
        </div>
        <Button text="Save settings" onClick={handleSaveSettings} />
      </div>
    </Popup>
  );
};

export default SettingsPopup;
