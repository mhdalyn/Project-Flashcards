import React, { useEffect, useState } from "react";
import { deleteDeck, listDecks } from "../../utils/api";
import DeckCard from "./DeckCard.js"

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
            <DeckCard deck={deck} handleDelete={handleDelete} />
          </div>
        );
      })
    );
  }, [deckList]);

  return <div>{content}</div>;
}
