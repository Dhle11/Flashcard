import React from "react";
import HomeNav from "../Home/HomeNav";
import DeckForm from "./DeckForm";

function CreateDeck() {

  return (
    <>
      <div className="d-flex">
        <HomeNav pageName={"Create Deck"} />
      </div>
      <div className="d-flex flex-column">
        <h2>Create Deck</h2>
        <DeckForm mode="create" />
      </div>
    </>
  );
}
export default CreateDeck;