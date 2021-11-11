import React from "react";
import DeleteButton from "../CommonComponents/DeleteButton";
import { Link } from "react-router-dom";

export default function DeckCard({deck, handleDelete}) {
    return (
        <>
         <h1>{deck.name}</h1>
            <p>{deck.cards.length} cards</p>
            <p>{deck.description}</p>
            <Link className="btn btn-secondary" to={`/decks/${deck.id}`}>
              <span className="oi oi-pencil" /> View
            </Link>
            <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
              <span className="oi oi-book" /> Study
            </Link>
            <DeleteButton handler={handleDelete} id={deck.id} />
        </>

    )
}