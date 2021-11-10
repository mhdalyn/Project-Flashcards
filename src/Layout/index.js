import React from "react";
import { Route, Switch } from "react-router";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckButton from "./HomePage/CreateDeckButton";
import DeckList from "./HomePage/DeckList"
import DeckCreator from "./Deck/DeckCreator"
import Study from "./StudyPage/Study"
import DeckView from "./Deck/DeckViewer";
import EditCard from "./Cards/EditCard";
import EditDeck from "./Deck/EditDeck";
import AddCard from "./Cards/AddCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <CreateDeckButton />
            <DeckList />
          </Route>
          <Route path="/decks/new">
            <DeckCreator />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
