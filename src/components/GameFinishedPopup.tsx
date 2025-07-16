import { FC, memo, useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import Button from "./Button";
import Popup from "./Popup";

interface GameFinishedPopupProps {
  isOpen: boolean;
  onPlayAgain: () => void;
  hasWon: boolean;
  username: string;
}

const IsolatedConfetti = memo(() => {
  return (
    <ConfettiExplosion duration={5000} className="absolute top-0 left-1/2" />
  );
});

const GameFinishedPopup: FC<GameFinishedPopupProps> = ({
  isOpen,
  onPlayAgain,
  hasWon,
  username,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen && hasWon) {
      setShowConfetti(true);
      return () => setShowConfetti(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Popup
      isOpen={isOpen}
      setIsOpen={() => null}
      title={`${hasWon ? `Congrats ${username}! You won!` : `Sorry ${username}! You lost`}`}
      hideShowButton
    >
      <div className="relative flex flex-col gap-[15px]">
        <Button text="Play again!" onClick={onPlayAgain} />
        {showConfetti && <IsolatedConfetti />}
      </div>
    </Popup>
  );
};

export default GameFinishedPopup;
