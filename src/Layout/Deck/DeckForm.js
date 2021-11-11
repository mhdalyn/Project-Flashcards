import React from "react";
import { Link } from "react-router-dom";

//
export default function DeckForm({deckName, description, handleDeckNameChange, handleDescriptionChange, submitHandler, cancelTarget}) {
    return (<form>
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
                <Link className="btn btn-secondary" to={cancelTarget}>
                    Cancel
                </Link>
                <button className="btn btn-primary" onClick={submitHandler}>
                    Submit
                </button>
            </form>)
}