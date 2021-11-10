import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { updateDeck , readDeck } from "../utils/api";

export default function EditDeck() {
    const {deckId} = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const handleDeckNameChange = (event) => setDeck({name:event.target.value , description:deck.description, id:deck.id, cards:deck.cards });
    const handleDescriptionChange = (event) => setDeck({name:deck.name , description:event.target.value, id:deck.id, cards:deck.cards });
    async function submitHandler(event) {
        event.preventDefault();
        await updateDeck(deck);
        history.push(`/decks/${deckId}`);
    }
    async function loadDeck() {
        const response = await readDeck(deckId);
        setDeck(response);
    }
    useEffect(() => {
        loadDeck();
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
                        Edit Deck
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
                        value={deck.name}
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
                        value={deck.description}
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
