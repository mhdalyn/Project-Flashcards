import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { createDeck } from "../../utils/api";

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
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/"><span className="oi oi-home" /> Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
                    </li>
                </ol>
            </nav>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Deck Name"
                        onChange={handleDeckNameChange}
                        value={deckName}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        placeholder="Brief description of the deck"
                        onChange={handleDescriptionChange}
                        value={description}
                    ></textarea>
                </div>
                <Link className="btn btn-secondary" to="/">
                    Cancel
                </Link>
                <button className="btn btn-primary" onClick={submitHandler}>
                    Submit
                </button>
            </form>
        </div>
    );
}
