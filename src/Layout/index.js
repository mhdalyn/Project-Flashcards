import React from "react";
import { Route, Switch } from "react-router";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckButton from "./HomePage/CreateDeckButton";
import DeckList from "./HomePage/DeckList"
import DeckCreator from "./DeckCreator"
import Study from "./StudyPage/Study"

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
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
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
