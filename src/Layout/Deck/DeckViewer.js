import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import { deleteDeck, deleteCard } from "../../utils/api";
import Breadcrumb from "../CommonComponents/Breadcrumb";
import CardCard from "./CardCard";
import DeleteButton from "../CommonComponents/DeleteButton";

export default function DeckView() {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cardList, setCardList] = useState([]);

    //loadDeck exists outside the useEffect to allow handleDeleteCard to call it to rerender after cards are deleted
    async function loadDeck() {
        const response = await readDeck(deckId);
        setDeck(response);
    }

    useEffect(() => {
        loadDeck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //deletes a deck when delete button is pressed
    const handleDeleteDeck = async (id) => {
        const result = window.confirm(
            "Delete this deck? \n \n You will not be able to recover it."
        );
        if (result) {
            await deleteDeck(id);
            history.push("/")
        }
    };

    //deletes a card when delete button is pressed, then rerenders the page
    const handleDeleteCard = async (id) => {
        const result = window.confirm(
            "Delete this card? \n \n You will not be able to recover it."
        );
        if (result) {
            await deleteCard(id);
            loadDeck();
        }
    };
    
    //maps out cards once deck is loaded
    useEffect(() => {
        if (deck.cards) {
            setCardList(deck.cards.map((card) => {
                return (
                    <div key={card.id} className="card mb-3" >
                        <CardCard card={card} deckId={deck.id} handleDeleteCard={handleDeleteCard} />
                     </div>
                )
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deck])
    return (
        <div>
            <Breadcrumb pageName={deck.name} />
            <h5>{deck.name}</h5>
            <p>{deck.description}</p>
            <Link className="btn btn-secondary" to={`/decks/${deck.id}/edit`}>
                <span className="oi oi-pencil" /> Edit
            </Link>
            <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
                <span className="oi oi-book" /> Study
            </Link>
            <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>
                <span className="oi oi-plus" /> Add Cards
            </Link>
            <DeleteButton handler={handleDeleteDeck} id={deck.id} />
            <div>
                <h3>Cards</h3>
                {cardList}
            </div>
        </div>
    );
}
