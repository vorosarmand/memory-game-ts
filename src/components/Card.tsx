import { FC } from "react";
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
      className="cursor-pointer w-[100px] h-[150px] bg-white rounded-md flex items-center justify-center drop-shadow-[0_2px_1px_rgba(0,0,0,0.15)] group"
      onClick={onClick}
    >
      <div className="w-full h-full relative flex justify-center items-center">
        <svg
          width="81"
          height="130"
          viewBox="0 0 81 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[81px] h-[130px]"
        >
          <path
            d="M28.0405 0.893125C3.01358 2.74412 -0.341584 30.509 0.0252835 55.9602C0.959125 120.745 0.0252818 130 44.3828 130C80.8026 130 81.7364 105.937 80.8026 95.7566C79.4018 61.0505 80.8026 69.38 80.8026 35.5993C80.8026 -2.02309 59.3242 -1.42062 28.0405 0.893125Z"
            className="fill-[#F5F5F5] group-hover:fill-[#EDF5F3] transition duration-300"
          />
        </svg>
        <div className="absolute w-full h-full flex justify-center items-center">
          <svg
            width="32"
            height="47"
            viewBox="0 0 32 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.392 29.68C10.392 21.936 19.992 19.248 19.992 14.384C19.992 12.528 18.712 11.312 16.216 11.312C13.336 11.312 11.416 13.296 10.072 16.368L0.343994 10.8C3.28799 3.69599 9.68799 0.23999 16.664 0.23999C24.472 0.23999 31.384 4.84799 31.384 12.976C31.384 22.576 21.272 25.264 21.272 29.68H10.392Z"
              className="fill-[#AAAAAA] group-hover:fill-[#C0E7DE] transition duration-300"
            />
            <path
              d="M15.832 46.896C12.12 46.896 9.176 43.952 9.176 40.24C9.176 36.592 12.12 33.584 15.832 33.584C19.544 33.584 22.488 36.592 22.488 40.24C22.488 43.952 19.544 46.896 15.832 46.896Z"
              className="fill-[#AAAAAA] group-hover:fill-[#C0E7DE] transition duration-300"
            />
          </svg>
        </div>
      </div>
      <div
        className={`absolute text-[60px] transform origin-left transition duration-300 overflow-hidden w-full h-full bg-white flex justify-center items-center p-2 border border-[#D5D5D5] rounded-md ${
          isTurned ? "scale-x-100" : "scale-x-0"
        }`}
      >
        <div className="bg-[#FBFBFB] rounded-md w-full h-full flex justify-center items-center">
          <span>{type}</span>
        </div>
      </div>
    </button>
  );
};

export default Card;
