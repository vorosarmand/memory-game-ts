import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { FC } from "react";

interface ButtonProps {
  text?: string;
  icon?: IconDefinition;
  disabled?: boolean;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ text, icon, disabled = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        text
          ? "w-full rounded-[30px] bg-[#FF3F56] py-[15px] font-bold text-white uppercase"
          : "h-8 w-8 text-[#D5D5D5] hover:text-gray-200",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
      )}
    >
      {icon ? <FontAwesomeIcon icon={icon} size="xl" /> : null}
      {text ? text : null}
    </button>
  );
};

export default Button;
