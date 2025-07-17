import { FC, useEffect } from "react";
import { ellapseTime } from "../state/gameSlice";
import { useAppDispatch, useAppSelector } from "../state/hooks";

interface TimerProps {}

const Timer: FC<TimerProps> = ({}) => {
  const config = useAppSelector((state) => state.config);
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  // Start the timer
  useEffect(() => {
    if (game.isGamePaused) return;
    const interval = setInterval(() => {
      dispatch(ellapseTime(config.total_time));
    }, 1000);
    if (game.isGameFinished) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [dispatch, config.total_time, game.isGameFinished, game.isGamePaused]);

  return (
    <div className="flex h-[65px]">
      <div className="flex h-full w-20 items-center justify-center border-r border-[#D5D5D5] pr-[15px] text-[52px] leading-[52px] font-black text-[#FF3F56]">
        <span>{config.total_time - game.ellapsed_time}</span>
      </div>
      <div className="flex min-w-[118px] flex-col">
        <h3 className="border-b border-[#D5D5D5] pb-[7px] pl-[15px] text-lg font-bold text-black">
          {game.matches} matches
        </h3>
        <h3 className="pt-[7px] pl-[15px] text-lg font-bold text-black">
          {game.mistakes} mistakes
        </h3>
      </div>
    </div>
  );
};

export default Timer;
