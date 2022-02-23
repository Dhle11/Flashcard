import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DeckList from "../Deck/DeckList";
import NotFound from "../Layout/NotFound";
import { listDecks } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState([]);


  useEffect(() => {
    const abortCon = new AbortController();

    async function loadDecks() {
      try {
        const loadedDecks = await listDecks();
        setDecks([...loadedDecks]);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError((currErr) => [...currErr, err]);
        }
      }
    }
    loadDecks();
    return abortCon.abort();
  }, []);

  if (error[0]) return <NotFound />;

  return (
    <div className="d-flex flex-column">
      <div className="mb-2">
        <Link className="btn btn-secondary" to="/decks/new">
          <i className="fa-solid fa-plus"></i> Create Deck
        </Link>
      </div>

      <div>
        <DeckList decks={decks} />
      </div>
    </div>
  );
}
export default Home;