import React, { useEffect, useState } from 'react'
import './MemoryGame.css'
import SingleCard from './SingleCard';
const images = require.context('./images');
const imageList = images.keys().map(image => images(image));

const cardImages = [
    { 'src': imageList[1], matched: false },
    { 'src': imageList[2], matched: false },
    { 'src': imageList[3], matched: false },
    { 'src': imageList[4], matched: false },
    { 'src': imageList[5], matched: false },
    { 'src': imageList[6], matched: false },
]

const MemoryGame = () => {

    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const shuffleCards = () => {
        const shuffeledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }))
        setCards(shuffeledCards)
        setTurns(0)
    }

    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }

    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src) {
                            return {...card, matched: true}
                        } else {
                            return card
                        }
                    })
                })
                resetTurn()
            } else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo]);

    return (
        <div className='MemoryGame'>
            <h1>Memory Match</h1>
            <button onClick={shuffleCards} >New Game</button>
            <div className="card-grid">
                { cards.map(card => (
                    <SingleCard
                        key={card.id} 
                        card={card} 
                        back={imageList[0]}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disabled={disabled}
                    />
                )) }
            </div>
            <p>Turns: {turns} </p>
        </div>
    )
}

export default MemoryGame
