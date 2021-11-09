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
                        <Link to="/"><span className="oi oi-home" /> Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {deck.name}
                    </li>
                </ol>
            </nav>
            <h5>{deck.name}</h5>
            <p>{deck.description}</p>
            <Link className="btn btn-secondary" to={`/decks/${deck.id}/edit`}>
            <span className="oi oi-pencil" /> Edit
            </Link>
            <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
            <span className="oi oi-book" /> Study
            </Link>
            <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>
            <span className="oi oi-plus" /> Add Cards
            </Link>
            <button
                className="btn btn-danger"
                onClick={() => handleDeleteDeck(deck.id)}
            >
               <span className="oi oi-trash" /> Delete
            </button>
            <div>
                <h3>Cards</h3>
                cardlist
            </div>
        </div>
    );
}
