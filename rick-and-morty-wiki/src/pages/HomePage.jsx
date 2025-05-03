

import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import CharacterCard from "../components/CharacterCard";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle.jsx";

const HomePage = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const handleRandomClick = () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    navigate(`/character/${randomId}`);
  };

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        let characters = [];
        let nextUrl = "https://rickandmortyapi.com/api/character";
        while (nextUrl) {
          const res = await fetch(nextUrl);
          const data = await res.json();
          characters = characters.concat(data.results);
          nextUrl = data.info.next;
        }
        setAllCharacters(characters);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllCharacters();
  }, []);

  const totalPages = Math.ceil(allCharacters.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const selectedCharacters = allCharacters.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="homepage">
      <h1>Rick and Morty Characters</h1>

      <div className="controls">
        <button onClick={handleRandomClick} className="random-btn">
          Random Character
        </button>
        <ThemeToggle />
      </div>

      <div className="grid">
        {selectedCharacters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
