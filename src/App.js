import React, {useState, useEffect} from 'react';
import shuffle from 'lodash.shuffle'
import './App.css';


const pokemon = [
  { id: 4, name: 'charizard' },
  { id: 10, name: 'caterpie' },
  { id: 77, name: 'ponyta' },
  { id: 108, name: 'lickitung' },
  { id: 132, name: 'ditto' },
  { id: 133, name: 'eevee' },
];

const doublePokemon = shuffle([...pokemon, ...pokemon])

export default function App() {
  const [opened, setOpened] = useState([])
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect (() => {
    if (opened.length < 2) return;

    const firstPokemon = doublePokemon[opened[0]]
    const secondPokemon = doublePokemon[opened[1]]

    console.log(firstPokemon, secondPokemon);

    if(firstPokemon.name === secondPokemon.name) 
      setMatched((matched) => [...matched, firstPokemon.id]);
    
  }, [opened])

  useEffect(() => {
    if(opened.length === 2) setTimeout(() =>
    setOpened([]), 600)
  }, [opened])

  useEffect(() => {
    if (matched.length === pokemon.length) alert('you won!');
  })

  function flipCard(index) {
    setMoves((moves) => moves + 1)
    setOpened(opened => [...opened, index])
  }

  return (
  <div className="app">
  <p>{moves} <strong>moves</strong> </p>
    <div className="cards">
    {doublePokemon.map((pokemon, index) => {
    let isFlipped = false

    if(opened.includes(index)) isFlipped = true;
    if(matched.includes(pokemon.id)) isFlipped = true;
    
    return (
      <PocemonCard 
      key={index} 
      index={index}
      pokemon={pokemon} 
      isFlipped={isFlipped}
      flipCard={flipCard}

      />
    )
    })}
    </div>
  </div>
  )
}


function PocemonCard({pokemon, index, flipCard, isFlipped}) {
  return(
    <button className={`pokemon-card ${isFlipped ? 'flipped' : ''} `} 
    onClick={() => flipCard(index)}>
      <div className="inner">
      <div className="front">  <img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png
`} alt={pokemon.name}
  width="100"
/>
</div>
      <div className="back">?</div>
      </div>
      </button>
  )
}