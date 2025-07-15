import { FC } from "react";
import cardBackground from "../assets/card-background.svg";
import QuestionMark from "../assets/question-mark.svg";
import { animalEmojiType } from "../types/AnimalEmojiType";

export interface CardProps {
  id: number;
  type: animalEmojiType;
  isTurned: boolean;
  onClick: () => void;
}

const Card: FC<CardProps> = ({ id, type, isTurned = false, onClick }) => {
  return (
    <button
      className="cursor-pointer w-[100px] h-[150px] bg-white rounded-md flex items-center justify-center drop-shadow-[0_2px_1px_rgba(0,0,0,0.15)]"
      onClick={onClick}
    >
      {isTurned ? (
        <div className="absolute text-[60px]">{type}</div>
      ) : (
        <div className="w-full h-full relative flex justify-center items-center">
          <img
            src={cardBackground}
            alt="card background"
            className="w-[81px] h-[130px]"
          />
          <div className="absolute w-full h-full flex justify-center items-center">
            <img
              src={QuestionMark}
              alt="question mark"
              className="w-[32px] h-[47px]"
            />
          </div>
        </div>
      )}
    </button>
  );
};

export default Card;
