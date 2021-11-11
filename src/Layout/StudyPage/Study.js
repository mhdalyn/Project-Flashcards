import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { readDeck } from "../../utils/api";
import Breadcrumb from "../CommonComponents/Breadcrumb";
import StudyCard from "./StudyCard";

export default function Study() {
  const { deckId } = useParams();
  //stores the deck information with its list of cards
  const [deck, setDeck] = useState([]);
  //stores render information for current card
  const [card, setCard] = useState("");
  //stores index position to navigate the deck's card array
  const [index, setIndex] = useState(0);
  //tracks which side of card is displayed
  const [side, setSide] = useState("front")
  const history = useHistory();

  //initializes deck state from API
  useEffect(() => {
    async function loadDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, [deckId]);

  //renders the page with the card using deck api and index number
  useEffect(() => {
    //uses an if to only run once deck state is loaded
    if (deck.cards) {
      setCard(<StudyCard deck={deck} handleNext={handleNext} handleFlip={handleFlip} index={index} side={side} />)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deck, index, side]);

  //rerenders card from front text to back text, as well as switching from flip to next button
  function handleFlip() {
    if (side === "front") {
      setSide("back")
    } else {
      setSide("front")
    }
  }

  //increases index until the final card, then prompts user to decide to restart or return to home page
  function handleNext() {
    //moves to next card in deck until final card & flips card back to front
    if (index + 1 < deck.cards.length) {
      setIndex(index + 1);
      setSide("front")
    } else {
      //upon hitting final card, prompts user to restart or quit studying
      const response = window.confirm(
        "Restart cards? \n \n Click 'cancel' to return to the home page."
      );
      if (response) {
        //resets index to zero, taking user back to first card & flips card back to front
        setIndex(0);
        setSide("front")
      } else {
        //redirects home if user chooses not to restart
        history.push("/");
      }
    }
  }

  return (
    <>
      <Breadcrumb deck={deck} pageName="Study" />
      <h1>Study: {deck.name}</h1>
      {card}
    </>
  );
}
