import clsx from "clsx";
import { FC } from "react";

interface InputProps {
  type: string;
  value: string | number;
  id?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
}

const Input: FC<InputProps> = (props) => {
  return (
    <div className="flex items-center gap-2">
      {props.hasError ? (
        <span className="text-2xl font-black text-[#FF3F56]">!</span>
      ) : null}
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        id={props.id}
        className={clsx(
          `h-[41px] w-[50px] rounded-[10px] border border-[#D5D5D5] text-center text-lg font-medium focus:outline-[#FF3F56]`,
          props.className && props.className,
        )}
      />
    </div>
  );
};

export default Input;
