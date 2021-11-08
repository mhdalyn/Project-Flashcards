import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { readCard, readDeck } from "../../utils/api";

export default function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState([]);
  const [card, setCard] = useState({});

  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);
  return (
    <div>
      <h1>Study: {deck.name}</h1>
      <div className="card w-75">
        <div className="card-body">
          <h5 className="card-title">Card index of cards.length</h5>
          <p className="card-text">
            card.front
          </p>
          <button className="btn btn-secondary">
            Flip
          </button>
        </div>
      </div>
    </div>
  );
}
