import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import { deleteDeck, deleteCard } from "../utils/api";

export default function DeckView() {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
        }
        loadDeck();
    }, [deckId]);
    //deletes a deck when delete button is pressed
    const handleDeleteDeck = async (id) => {
        const result = window.confirm(
            "Delete this deck? \n \n You will not be able to recover it."
        );
        if (result) {
            await deleteDeck(id);
            history.push("/")
        }
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {deck.name}
                    </li>
                </ol>
            </nav>
            <h5>{deck.name}</h5>
            <p>{deck.description}</p>
            <Link className="btn btn-secondary" to={`/decks/${deck.id}/edit`}>
                Edit
            </Link>
            <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
                Study
            </Link>
            <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>
                + Add Cards
            </Link>
            <button
                className="btn btn-danger"
                onClick={() => handleDeleteDeck(deck.id)}
            >
                Delete
            </button>
            <div>
                <h3>Cards</h3>
                cardlist
            </div>
        </div>
    );
}
