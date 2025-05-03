import React from 'react';
import '../styles/CharacterCard.css';

const CharacterCard = ({ character }) => {
  return (
    <div
      className="character-card"
      onClick={() => window.open(`/character/${character.id}`, '_blank')}
    >
      <img src={character.image} alt={character.name} />
      <div className="card-content">
        <h3>{character.name}</h3>
        <p>{character.species}</p>
        <p>Status: {character.status}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
