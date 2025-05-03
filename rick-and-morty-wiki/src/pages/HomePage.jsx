import React, { useEffect, useState } from "react";
import "../styles/HomePage.css";
import CharacterCard from "../components/CharacterCard";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle.jsx";

const HomePage = () => {
  const [characters, setCharacters] = useState([]);
  const [apiPage, setApiPage] = useState(1);
  const [subPage, setSubPage] = useState(1); 
  const [maxSubPage, setMaxSubPage] = useState(1);

  const navigate = useNavigate();
  const itemsPerSubPage = 6;

  const handleRandomClick = () => {
    const randomId = Math.floor(Math.random() * 826) + 1;
    navigate(`/character/${randomId}`);
  };

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${apiPage}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data.results);
        setSubPage(1); // reset sub-page when new API page is loaded
        setMaxSubPage(Math.ceil(data.results.length / itemsPerSubPage));
      })
      .catch((err) => console.error(err));
  }, [apiPage]);

  const startIndex = (subPage - 1) * itemsPerSubPage;
  const selectedCharacters = characters.slice(startIndex, startIndex + itemsPerSubPage);

  const handlePrev = () => {
    if (subPage > 1) {
      setSubPage((p) => p - 1);
    } else if (apiPage > 1) {
      setApiPage((p) => p - 1);
    }
  };

  const handleNext = () => {
    if (subPage < maxSubPage) {
      setSubPage((p) => p + 1);
    } else {
      setApiPage((p) => p + 1);
    }
  };

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
        <button onClick={handlePrev} disabled={apiPage === 1 && subPage === 1}>
          Previous
        </button>
        <span>
          Page {((apiPage - 1) * maxSubPage) + subPage}
        </span>
        <button onClick={handleNext} disabled={characters.length < itemsPerSubPage && subPage === maxSubPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
