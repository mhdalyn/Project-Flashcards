import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import { deleteDeck, deleteCard } from "../utils/api";

export default function DeckView() {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cardList, setCardList] = useState([]);
    async function loadDeck() {
        const response = await readDeck(deckId);
        setDeck(response);
    }
    useEffect(() => {
        loadDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    //TODO
    const handleDeleteCard = async (id) => {
        const result = window.confirm(
            "Delete this card? \n \n You will not be able to recover it."
        );
        if (result) {
            await deleteCard(id);
            loadDeck();
        }
    };
    useEffect(() => {
        if (deck.cards) {
            setCardList(deck.cards.map((card) => {
                return (
                    <div key={card.id} className="card mb-3" >
                        <div className="row no-gutters">
                            <div className="col">
                                <div className="card-body">
                                    <p className="card-text">{card.front}</p>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card-body">
                                    <p className="card-text">{card.back}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row no-gutters align-right">
                            <Link className="btn btn-secondary" to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                                <span className="oi oi-pencil" /> Edit Card
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteCard(deck.id)}>
                                <span className="oi oi-trash" />
                            </button>
                        </div>
                    </div>
                )
            }))
        } else {
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deck])
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
                <span className="oi oi-trash" />
            </button>
            <div>
                <h3>Cards</h3>
                {cardList}
            </div>
        </div>
    );
}
