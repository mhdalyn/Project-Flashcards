import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api";

export default function DeckList() {
  const [deckList, setDeckList] = useState([]);
  const [content, setContent] = useState();

  //initializes deckList on page load
  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDeckList);
    return () => abortController.abort();
  }, []);

  //deletes a deck when delete button is pressed
  const handleDelete = async (id) => {
    const result = window.confirm(
      "Delete this deck? \n \n You will not be able to recover it."
    );
    if (result) {
      await deleteDeck(id);

      //updates deckList after deck deletion
      listDecks().then(setDeckList);
    }
  };

  //renders the page every time deckList is updated
  useEffect(() => {
    setContent(() =>
      deckList.map((deck) => {
        return (
          <div key={deck.id}>
            <h1>{deck.name}</h1>
            <p>{deck.cards.length} cards</p>
            <p>{deck.description}</p>
            <Link className="btn btn-secondary" to={`/decks/${deck.id}`}>
            <span className="oi oi-pencil" /> View
            </Link>
            <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
            <span className="oi oi-book" /> Study
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(deck.id)}
            ><span className="oi oi-trash" />
            </button>
          </div>
        );
      })
    );
  }, [deckList]);

  return <div>{content}</div>;
}
