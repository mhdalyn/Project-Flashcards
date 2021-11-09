import React from "react";
import { Link } from "react-router-dom";

//routes user to the create deck form
export default function CreateDeckButton () {
    return <Link to="/decks/new" className="btn btn-secondary "><span className="oi oi-plus" /> Create Deck</Link>
}