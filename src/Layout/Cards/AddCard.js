import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";


export default function AddCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cardFront, setCardFront] = useState("");
    const [cardBack, setCardBack] = useState("");
    const handleFrontChange = (event) => setCardFront(event.target.value);
    const handleBackChange = (event) => setCardBack(event.target.value);

    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
        }
        loadDeck();
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
            <CardForm handleFrontChange={handleFrontChange} handleBackChange={handleBackChange} deckId={deckId} submitHandler={submitHandler} front={cardFront} back={cardBack} />
        </div>
    )
}