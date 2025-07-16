import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";

interface ButtonProps {
  onClick: () => void;
  text?: string;
  icon?: IconDefinition;
}

const Button: FC<ButtonProps> = ({ onClick, text, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer ${
        text
          ? "w-full rounded-[30px] bg-[#FF3F56] py-[15px] font-bold text-white uppercase"
          : "h-8 w-8 text-[#D5D5D5] hover:text-gray-200"
      }`}
    >
      {icon ? <FontAwesomeIcon icon={icon} size="xl" /> : null}
      {text ? text : null}
    </button>
  );
};

export default Button;
