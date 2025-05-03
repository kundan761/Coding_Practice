import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Clock from '../components/Clock';
import '../styles/CharacterDetailPage.css';

const CharacterDetailPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(data => setCharacter(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!character) return <p>Loading...</p>;

  return (
    <div className="character-detail">
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <ul>
        <li><strong>Status:</strong> {character.status}</li>
        <li><strong>Species:</strong> {character.species}</li>
        {character.type && <li><strong>Type:</strong> {character.type}</li>}
        <li><strong>Gender:</strong> {character.gender}</li>
        <li><strong>Origin:</strong> {character.origin.name}</li>
        <li><strong>Location:</strong> {character.location.name}</li>
        <li><strong>Episode Appearances:</strong> {character.episode.length}</li>
      </ul>
      <Clock />
    </div>
  );
};

export default CharacterDetailPage;
