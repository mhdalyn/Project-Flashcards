import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";


export default function AddCard() {
    const {deckId} = useParams();
    const [deck, setDeck] = useState({});
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");
    const handleFrontChange = (event) => setCardFront(event.target.value);
    const handleBackChange = (event) => setCardBack(event.target.value);
    async function loadDeck() {
        const response = await readDeck(deckId);
        setDeck(response);
    }
    useEffect(() => {
        loadDeck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deckId]);
    async function submitHandler(event) {
        event.preventDefault();
        const card = { front: cardFront, back: cardBack };
        await createCard(deckId, card);
        alert("Card created!")
        setCardFront("")
        setCardBack("")
    }
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
                        Add Card
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
                        value={cardFront}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="back">Back</label>
                    <textarea
                        className="form-control"
                        id="back"
                        placeholder="Back side of card"
                        onChange={handleBackChange}
                        value={cardBack}
                    />
                </div>
                <Link className="btn btn-secondary" to="/">
                    Cancel
                </Link>
                <button className="btn btn-primary" onClick={submitHandler}>
                    Submit
                </button>
            </form>
        </div>
    )
}