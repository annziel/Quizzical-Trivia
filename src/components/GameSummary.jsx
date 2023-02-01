// TO DO:
// handleClick - other features
// game-summary-text - score rendering


import React from "react"

export default function GameSummary(props) {
    function handleClick() {
        props.setAnswers()
    }
    
    return (
        <div className="game-summary">
            {props.isAnswersChecked && <p className="game-summary-txt">You scored 3/5 correct answers</p>}
            <button
                onClick={handleClick}
                className="main-btn game-summary-btn"
            >
                {props.isAnswersChecked ? "Play again" : "Check answers"}
            </button>  
        </div>
    )
   
    
}