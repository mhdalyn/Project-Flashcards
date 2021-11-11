import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "../CommonComponents/DeleteButton";

//card component representing individual cards for the list on the deck view page
export default function CardCard({handleDeleteCard, card, deckId}) {
    return (
        <>
        <div className="row no-gutters">
                             <div className="col">
                                 <div className="card-body">
                                     <p className="card-text">{card.front}</p>
                                 </div>
                             </div>
                             <div className="col">
                                 <div className="card-body">
                                     <p className="card-text">{card.back}</p>
                                 </div>
                             </div>
                         </div>
                         <div className="row no-gutters align-right">
                             <Link className="btn btn-secondary" to={`/decks/${deckId}/cards/${card.id}/edit`}>
                                 <span className="oi oi-pencil" /> Edit Card
                             </Link>
                             <DeleteButton handler={handleDeleteCard} id={card.id} />
                         </div></>
    )
}