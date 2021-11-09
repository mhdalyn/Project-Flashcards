import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import { readDeck } from "../../utils/api";

export default function Study() {
  const { deckId } = useParams();
  //stores the deck information with its list of cards
  const [deck, setDeck] = useState([]);
  //stores render information for current card
  const [card, setCard] = useState("");
  //stores index position to navigate the deck's card array
  const [index, setIndex] = useState(0);
  const history = useHistory();

  //initializes deck state from API
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  //renders the page with the card using deck api and index number
  useEffect(() => {
    //uses an if to only run once deck state is loaded
    if (deck.cards) {
      if (deck.cards.length > 3) {
        const currentCard = deck.cards[index];
        setCard(
          <div className="card w-75">
            <div className="card-body">
              <h5 className="card-title">
                Card {index + 1} of {deck.cards.length}
              </h5>
              <p className="card-text">{currentCard.front}</p>
              <button className="btn btn-secondary" onClick={handleFlip}>
                Flip
              </button>
            </div>
          </div>
        );
      } else {
        setCard(
          <div className="card w-75">
            <div className="card-body">
              <h5 className="card-title">Not enough Cards</h5>
              <p className="card-text">
                You need at least 3 cards to study. there are{" "}
                {deck.cards.length} cards in this deck.
              </p>
              <Link
                className="btn btn-secondary"
                to={`/decks/${deck.id}/cards/new`}
              >
                + Add Cards
              </Link>
            </div>
          </div>
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, index]);

  //rerenders card from front text to back text, as well as switching from flip to next button
  function handleFlip() {
    const currentCard = deck.cards[index];
    setCard(
      <div className="card w-75">
        <div className="card-body">
          <h5 className="card-title">
            Card {index + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">{currentCard.back}</p>
          <button className="btn btn-secondary" onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    );
  }

  //increases index until the final card, then prompts user to decide to restart or return to home page
  function handleNext() {
    if (index + 1 < deck.cards.length) {
      setIndex(index + 1);
    } else {
      const response = window.confirm(
        "Restart cards? \n \n Click 'cancel' to return to the home page."
      );
      if (response) {
        setIndex(0);
      } else {
        history.push("/");
      }
    }
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h1>Study: {deck.name}</h1>
      {card}
    </>
  );
}
