import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { createCard, readDeck } from "../../utils/api";
import Breadcrumb from "../CommonComponents/Breadcrumb";
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
            <Breadcrumb deck={deck} pageName="Add Card" />
            <CardForm handleFrontChange={handleFrontChange} handleBackChange={handleBackChange} deckId={deckId} submitHandler={submitHandler} front={cardFront} back={cardBack} />
        </div>
    )
}