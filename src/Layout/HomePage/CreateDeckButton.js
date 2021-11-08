import React from "react";
import { Link } from "react-router-dom";

export default function CreateDeckButton () {
    return <Link to="/decks/new" className="btn btn-secondary">+ Create Deck</Link>
}