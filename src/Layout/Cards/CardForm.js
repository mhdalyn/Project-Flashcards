import React from "react"
import { Link } from "react-router-dom"


export default function CardForm({ handleFrontChange, handleBackChange, deckId, submitHandler, front, back }) {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="front">Front</label>
                <textarea
                    className="form-control"
                    id="front"
                    placeholder="Front side of card"
                    onChange={handleFrontChange}
                    value={front}
                />
            </div>
            <div className="form-group">
                <label htmlFor="back">Back</label>
                <textarea
                    className="form-control"
                    id="back"
                    placeholder="Back side of card"
                    onChange={handleBackChange}
                    value={back}
                />
            </div>
            <Link className="btn btn-secondary" to={`/decks/${deckId}`}>
                Cancel
            </Link>
            <button className="btn btn-primary" onClick={submitHandler}>
                Submit
            </button>
        </form>
    )
}
