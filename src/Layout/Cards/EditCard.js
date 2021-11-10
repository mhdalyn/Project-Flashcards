import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { updateCard, readDeck, readCard } from "../../utils/api";
import CardForm from "./CardForm"

export default function EditCard() {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({})
    const handleFrontChange = (event) => setCard({ id: cardId, deckId: deck.id, front: event.target.value, back: card.back });
    const handleBackChange = (event) => setCard({ id: cardId, deckId: deck.id, front: card.front, back: event.target.value });
    async function submitHandler(event) {
        event.preventDefault();
        await updateCard(card);
        history.push(`/decks/${deckId}`);
    }
    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
        }
        async function loadCard() {
            const response = await readCard(cardId);
            setCard(response);
        }
        loadDeck();
        loadCard();
    }, [cardId, deckId])
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
            <CardForm handleFrontChange={handleFrontChange} handleBackChange={handleBackChange} deckId={deckId} submitHandler={submitHandler} front={card.front} back={card.back} />
        </div>
    );
}
