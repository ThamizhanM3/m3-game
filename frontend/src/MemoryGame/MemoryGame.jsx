import React, { useEffect, useState } from 'react'
import './MemoryGame.css'
import SingleCard from './SingleCard';
const images = require.context('./images');
const imageList = images.keys().map(image => images(image));

const cardImages = [
    [
        { 'src': imageList[1], matched: false },
        { 'src': imageList[2], matched: false },
        { 'src': imageList[3], matched: false },
        { 'src': imageList[4], matched: false }
    ],
    [
        { 'src': imageList[1], matched: false },
        { 'src': imageList[2], matched: false },
        { 'src': imageList[3], matched: false },
        { 'src': imageList[4], matched: false },
        { 'src': imageList[5], matched: false },
        { 'src': imageList[6], matched: false },
    ],
    [
        { 'src': imageList[7], matched: false },
        { 'src': imageList[8], matched: false },
        { 'src': imageList[9], matched: false },
        { 'src': imageList[10], matched: false },
    ],
    [
        { 'src': imageList[7], matched: false },
        { 'src': imageList[8], matched: false },
        { 'src': imageList[9], matched: false },
        { 'src': imageList[10], matched: false },
        { 'src': imageList[11], matched: false },
        { 'src': imageList[12], matched: false },
    ],
    [
        { 'src': imageList[1], matched: false },
        { 'src': imageList[2], matched: false },
        { 'src': imageList[3], matched: false },
        { 'src': imageList[4], matched: false },
        { 'src': imageList[5], matched: false },
        { 'src': imageList[6], matched: false },
        { 'src': imageList[7], matched: false },
        { 'src': imageList[8], matched: false },
        { 'src': imageList[9], matched: false },
        { 'src': imageList[10], matched: false },
        { 'src': imageList[11], matched: false },
        { 'src': imageList[12], matched: false },
    ]
]

const MemoryGame = () => {

    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [found, setFound] = useState(0);
    const [level, setLevel] = useState(0);

    const shuffleCards = () => {
        const shuffeledCards = [...cardImages[level], ...cardImages[level]]
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
                            setFound(found+1)
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

        let grid = document.querySelector('.card-grid')
        if (level === 5) {
            grid.style.gridTemplateColumns = '1fr 1fr 1fr 1fr 1fr 1fr'
        }

    }, [choiceOne, choiceTwo, found, level]);

    // useEffect(() => {
    //     if (turns === cards.length) {
    //         shuffleCards()
    //     }
    // }, [turns])
    
    useEffect(() => {
        console.log(cards);
        if (found*2 === cards.length && found !== 0) {
            setTimeout(() => levelCompeted(), 2000)
        } else {
            let grid = document.querySelector('.card-grid')
            grid.style.display = 'grid'
        }
    }, [found])

    const levelCompeted = () => {
        let grid = document.querySelector('.card-grid')
        let levelBlock = document.querySelector('.level')
        grid.style.display = 'none'
        levelBlock.style.display = 'block'
    }
    
    const levelup = () => {
        setLevel(level + 1)
        setFound(0)
        shuffleCards()
        let grid = document.querySelector('.card-grid')
        let levelBlock = document.querySelector('.level')
        grid.style.display = 'grid'
        levelBlock.style.display = 'none'
    }

    return (
        <div className='MemoryGame'>
            <h1>Memory Match</h1>
            <button onClick={shuffleCards} >New Game</button>
            <div className='card-grid'>
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
            <p style={{zIndex: '1', color: 'red'}} > <span style={{zIndex: '1'}}> Turns: {turns} </span></p>
            <div className="level">
                <button onClick={levelup} >Next Level</button>
            </div>
        </div>
    )
}

export default MemoryGame
