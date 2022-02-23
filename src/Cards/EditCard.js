import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HomeNav from "../Home/HomeNav";
import NotFound from "../Layout/NotFound";
import { readDeck } from "../utils/api";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
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
          linkName={`Deck ${deck.name}`}
          link={`/decks/${deck.id}`}
          pageName={`Edit Card ${cardId}`}
        />
      </div>
      <div className="d-flex flex-column">
        <h2>Edit Card</h2>
        <CardForm mode="edit" />
      </div>
    </>
  );
}
export default EditCard;