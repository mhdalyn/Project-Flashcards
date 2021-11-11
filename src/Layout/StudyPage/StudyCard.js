import React from "react";
import { Link } from "react-router-dom";

export default function StudyCard({ deck, side, index, handleFlip, handleNext }) {
    //declares values for not enough cards to study as default condition
    let cardTitle = "Not enough Cards";
    let cardText = `You need at least 3 cards to study. there are ${deck.cards.length} cards in this deck.`;
    let btnSec = <Link className="btn btn-secondary" to={`/decks/${deck.id}/cards/new`}>
        <span className="oi oi-plus" /> Add Cards</Link>
    let btnPrm = null;

    //changes card properties based on if front or back of card is active
    if (deck.cards.length > 2) {
        //declares common values for both front/back
        const currentCard = deck.cards[index];
        cardTitle = `Card ${index + 1} of ${deck.cards.length}`;
        btnSec = <button className="btn btn-secondary" onClick={handleFlip}>
            Flip
        </button>
        //assigns values based on front/back
        if (side === "front") {
            cardText = currentCard.front;
        } else {
            cardText = currentCard.back;
            btnPrm = <button className="btn btn-primary" onClick={handleNext}>
                Next
            </button>
        }
    }

    return (
        <div className="card w-75">
            <div className="card-body">
                <h5 className="card-title">
                    {cardTitle}
                </h5>
                <p className="card-text">{cardText}</p>
                {btnSec}
                {btnPrm}
            </div>
        </div>
    )
}