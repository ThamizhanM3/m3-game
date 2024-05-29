import React from 'react'
import './SingleCard.css'

const SingleCard = ({ card, back, handleChoice, flipped, disabled }) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className="SingleCard" >
            <div className={ flipped ? "flipped" : "" }>
                <img src={card.src} alt="card front" className="front" />
                <img src={back} alt="card back" className="back" onClick={handleClick} />
            </div>
        </div>
    )
}

export default SingleCard
