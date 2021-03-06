import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { updateCard, readDeck, readCard } from "../../utils/api";
import Breadcrumb from "../CommonComponents/Breadcrumb";
import CardForm from "./CardForm"

export default function EditCard() {
    const { deckId, cardId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({})
    //tracks form and sets initial values to initial card values to be edited
    const handleFrontChange = (event) => setCard({ id: cardId, deckId: deck.id, front: event.target.value, back: card.back });
    const handleBackChange = (event) => setCard({ id: cardId, deckId: deck.id, front: card.front, back: event.target.value });
    //updates card information
    async function submitHandler(event) {
        event.preventDefault();
        await updateCard(card);
        //returns user to deck view screen on edit submission
        history.push(`/decks/${deckId}`);
    }
    //loads initial deck and card information
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
            <Breadcrumb deck={deck} pageName="Edit Card" />
            <CardForm handleFrontChange={handleFrontChange} handleBackChange={handleBackChange} deckId={deckId} submitHandler={submitHandler} front={card.front} back={card.back} />
        </div>
    );
}
