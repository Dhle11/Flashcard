import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeNav from "../Home/HomeNav";
import CardForm from "./CardForm";
import { readDeck } from "../utils/api";
import NotFound from "../Layout/NotFound";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState([]);


  useEffect(() => {
    const abortCon = new AbortController();
    async function getDeck() {
      try {
        if (deckId) {
          const gotDeck = await readDeck(deckId, abortCon.signal);
          setDeck({ ...gotDeck });
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError((currErr) => [...currErr, err]);
        }
      }
    }
    getDeck();
    return () => abortCon.abort();
  }, [deckId]);

  if (error[0]) return <NotFound />;


  return (
    <>
      <div className="d-flex">
        <HomeNav
          linkName={deck.name}
          link={`decks/${deck.id}`}
          pageName={"Add Card"}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>{deck.name}: Add Card</h2>
        <CardForm />
      </div>
    </>
  );
}
export default AddCard;