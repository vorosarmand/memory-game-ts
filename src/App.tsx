import { faGear, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { shuffle } from "lodash";
import { useEffect } from "react";
import logo from "./assets/logo.svg";
import Button from "./components/Button";
import Card from "./components/Card";
import { ellapseTime } from "./state/configSlice";
import {
  checkMatch,
  clearTurnedCards,
  setCards,
  turnCard as turnCardAction,
} from "./state/gameSlice";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { AnimalEmojis } from "./types/AnimalEmojiType";

const TOTAL_TIME = 60;

function App() {
  const config = useAppSelector((state) => state.config);
  const game = useAppSelector((state) => state.game);
  const dispatch = useAppDispatch();

  // Initialize cards
  useEffect(() => {
    const cardTypes = shuffle(AnimalEmojis).slice(0, config.number_of_cards);
    dispatch(
      setCards(
        shuffle([...cardTypes, ...cardTypes]).map((card, index) => {
          return { id: index, type: card };
        }),
      ),
    );
  }, []);

  // Start the timer
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(ellapseTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check for matches and mistakes
  useEffect(() => {
    // Only proceed if exactly two cards are turned and not already checking
    if (game.turnedCardIds.length === 2 && !game.isCheckingMatch) {
      const [id1, id2] = game.turnedCardIds;
      const card1 = game.cards.find((card) => card.id === id1);
      const card2 = game.cards.find((card) => card.id === id2);

      // If both cards are found, check for a match
      if (card1 && card2) {
        setTimeout(() => {
          dispatch(
            checkMatch({
              card1Type: card1.type,
              card2Type: card2.type,
              card1Id: card1.id,
              card2Id: card2.id,
            }),
          );
        }, 500);

        // If no match, clear after a short delay so user can see both cards
        setTimeout(() => {
          dispatch(clearTurnedCards());
        }, 500);
      }
    }
  }, [game.turnedCardIds, game.isCheckingMatch, game.cards, dispatch]);

  const handleCardClick = (cardId: number) => {
    // Click prevention
    if (!game.isCheckingMatch && game.turnedCardIds.length < 2) {
      dispatch(turnCardAction(cardId));
    }
  };

  return (
    <main className="h-full w-full px-[50px] py-[30px]">
      <div className="m-auto w-full max-w-[1080px]">
        <header className="flex h-60 w-full items-center justify-between">
          <div>
            <img src={logo} alt="memory game logo" />
          </div>
          <div className="flex h-[65px]">
            <div className="flex h-full w-20 items-center justify-center border-r border-[#D5D5D5] pr-[15px] text-[52px] leading-[52px] font-black text-[#FF3F56]">
              <span>{TOTAL_TIME - config.ellapsed_time}</span>
            </div>
            <div className="flex min-w-[118px] flex-col">
              <h3 className="border-b border-[#D5D5D5] pb-[7px] pl-[7px] text-lg font-bold text-black">
                {game.matches} matches
              </h3>
              <h3 className="pt-[7px] pl-[7px] text-lg font-bold text-black">
                {game.mistakes} mistakes
              </h3>
            </div>
          </div>
          <div className="flex h-[44px] items-center gap-5">
            <Button icon={faGear} onClick={() => null} />
            <div className="h-full w-px bg-[#D5D5D5]"></div>
            <Button icon={faRepeat} onClick={() => null} />
          </div>
        </header>
        <div className="flex w-full flex-wrap justify-center gap-5 rounded-xl bg-[#F5F5F5] px-[30px] py-[35px] lg:px-[55px] lg:py-[50px]">
          {game.cards.map((card) => (
            <Card
              key={card.id}
              {...card}
              isTurned={
                game.turnedCardIds.includes(card.id) ||
                game.matchedCardIds.includes(card.id)
              }
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
