import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { updateDeck, readDeck } from "../../utils/api";
import Breadcrumb from "../CommonComponents/Breadcrumb";
import DeckForm from "./DeckForm";

export default function EditDeck() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({ name: "", description: "" });
    const handleDeckNameChange = (event) => setDeck({ name: event.target.value, description: deck.description, id: deck.id, cards: deck.cards });
    const handleDescriptionChange = (event) => setDeck({ name: deck.name, description: event.target.value, id: deck.id, cards: deck.cards });
    async function submitHandler(event) {
        event.preventDefault();
        await updateDeck(deck);
        history.push(`/decks/${deckId}`);
    }

    useEffect(() => {
        async function loadDeck() {
            const response = await readDeck(deckId);
            setDeck(response);
        }
        loadDeck();

    }, [deckId])
    return (
        <div>
            <Breadcrumb deck={deck} pageName="Edit Deck" />
            <DeckForm
                deckName={deck.name}
                description={deck.description}
                handleDeckNameChange={handleDeckNameChange}
                handleDescriptionChange={handleDescriptionChange}
                submitHandler={submitHandler}
                cancelTarget={`/decks/${deckId}`}
            />
        </div>
    );
}
