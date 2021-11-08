import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../../utils/api";

export default function DeckList() {
  const [deckList, setDeckList] = useState([]);
  const [content, setContent] = useState()
  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal).then(setDeckList);
    return () => abortController.abort();
  }, [])
  const handleDelete = async (id) => {
    const result = window.confirm(
      "Delete this deck? \n \n You will not be able to recover it."
    );
    if (result) {
      await deleteDeck(id);
    listDecks().then(setDeckList);
    }
  };
  useEffect(() => {

    if (deckList) {
      setContent(() => deckList.map((deck) => {
        return (
          <div id={`#deck${deck.id}`}>
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
            <p>{deck.cards.length} Cards</p>
            <Link className="btn btn-secondary" to={`/decks/${deck.id}/`}>View</Link>
            <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>Study</Link>
            <button className="btn btn-danger" onClick={() => handleDelete(deck.id)}>Delete</button>
          </div>
        );
      }));
      
    }
  }, [deckList]);
  return <div>{content}</div>;
}
