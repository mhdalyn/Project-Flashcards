import React from "react";
import { Link } from "react-router-dom";

//shared breadcrumb trail for all pages that utilize a breadcrumb trail
export default function Breadcrumb({deck, pageName}) {
    //only renders the deck portion of the breadcrumb if deck object is provided
    let deckCrumb = ""
    if (deck) {
        deckCrumb = (
            <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
        )
    }
    return (
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/"><span className="oi oi-home" /> Home</Link>
          </li>
          {deckCrumb}
          <li className="breadcrumb-item active" aria-current="page">
            {pageName}
          </li>
        </ol>
      </nav>
    )
}