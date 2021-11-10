import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { updateCard , readDeck, readCard } from "../utils/api";

export default function EditCard() {
    const {deckId, cardId} = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({})
    const handleFrontChange = (event) => setCard({id:cardId, deckId:deck.id, front:event.target.value, back:card.back});
    const handleBackChange = (event) => setCard({id:cardId, deckId:deck.id, front:card.front, back:event.target.value});
    async function submitHandler(event) {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deckId}`);
    }
    async function loadDeck() {
        const response = await readDeck(deckId);
        setDeck(response);
    }
    async function loadCard() {
        const response = await readCard(cardId);
        setCard(response);
    }
    useEffect(() => {
        loadDeck();
        loadCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home" /> Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Edit Card
                    </li>
                </ol>
            </nav>
            <form>
                <div className="form-group">
                    <label htmlFor="front">Front</label>
                    <textarea
                        className="form-control"
                        id="front"
                        placeholder="Front side of card"
                        onChange={handleFrontChange}
                        value={card.front}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea
                        className="form-control"
                        id="back"
                        placeholder="Back side of card"
                        onChange={handleBackChange}
                        value={card.back}
                    />
                </div>
                <Link className="btn btn-secondary" to={`/decks/${deckId}`}>
                    Cancel
                </Link>
                <button className="btn btn-primary" onClick={submitHandler}>
                    Submit
                </button>
            </form>
        </div>
    );
}
