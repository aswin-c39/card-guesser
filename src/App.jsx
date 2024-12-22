import { useEffect, useState } from 'react'
import './App.css'
import Card from './card.jsx'

import archlinux from './assets/archlinux.jpg';
import css from './assets/css.png';
import debian from './assets/Debian.png';
import fedora from './assets/Fedora.png';
import html from './assets/html.png';
import js from './assets/js.png';
import mysql from './assets/MySQL.png';
import php from './assets/php.png';
import back from './assets/back.jpg';

const cardImages = [
  { src: archlinux, matched: false},
  { src: css, matched: false},
  { src: debian, matched: false},
  { src: fedora, matched: false},
  { src: html, matched: false},
  { src: js, matched: false},
  { src: mysql, matched: false},
  { src: php, matched: false},
];

function App() {

  const[cards, setCards] = useState([]);
  const[turns, setTurns] = useState(0);
  const[choice1, setChoice1] = useState(null);
  const[choice2, setChoice2] = useState(null);
  const[disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoice1(null);
    setChoice2(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  
  const handleChoice = (card) => {
    choice1 ? setChoice2(card) : setChoice1(card);
  };

  useEffect(() => {
    setDisabled(true)
    if(choice1 && choice2){
      if (choice1.src === choice2.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choice1.src) {
              return { ...card, matched: true };  
            }
            return card;  
          });
        });
        resetTurn();
      }  else {
        setTimeout(() => resetTurn(), 500)
      }
    }
  }, [choice1, choice2])

  const resetTurn = () => {
    setChoice1(null);
    setChoice2(null);
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false);
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <Card key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choice1 || card === choice2 || card.matched}
          disabled={disabled}
          />
        ))}
      </div>

    </div>
  );
}

export default App