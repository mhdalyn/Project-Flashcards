import React, { useState } from "react";
import { useHistory } from "react-router";
import { createDeck } from "../../utils/api";
import Breadcrumb from "../CommonComponents/Breadcrumb";
import DeckForm from "./DeckForm";

export default function DeckCreator() {
    const history = useHistory();
    const [deckName, setDeckName] = useState("");
    const [description, setDescription] = useState("");
    const handleDeckNameChange = (event) => setDeckName(event.target.value);
    const handleDescriptionChange = (event) => setDescription(event.target.value);
    async function submitHandler(event) {
        event.preventDefault();
        const deck = { name: deckName, description: description };
        const response = await createDeck(deck);
        history.push(`/decks/${response.id}`);
    }
    return (
        <div>
            <Breadcrumb pageName="Create Deck" />
            <DeckForm
                deckName={deckName}
                description={description}
                handleDeckNameChange={handleDeckNameChange}
                handleDescriptionChange={handleDescriptionChange}
                submitHandler={submitHandler}
                cancelTarget="/"
            />
        </div>
    );
}
