import React, { useState } from 'react'
import Questions from "./Questions"
import GameSummary from "./GameSummary"

export default function Game() {
    const [answersChecked, setAnswersChecked] = useState(true)

    function toggleAnswersChecking() {
        setAnswersChecked(prevState => !prevState)
    }

    return (
        <div className="game text-container">
            <Questions />
            <GameSummary isAnswersChecked={answersChecked} setAnswers={toggleAnswersChecking}/>
        </div>
    )
}