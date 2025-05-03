import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import CharacterCard from "../components/CharacterCard";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleRandomClick = () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    navigate(`/character/${randomId}`);
  };

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((data) => setCharacters(data.results))
      .catch((err) => console.error(err));
  }, [page]);

  return (
    <div className="homepage">
      <h1>Rick and Morty Characters</h1>
      <button onClick={handleRandomClick} className="random-btn">Random Character</button>
      <div className="grid">
        {characters.map((char) => (
          <CharacterCard key={char.id} character={char} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
};

export default HomePage;
