import React from 'react'

export default function Home(props) {
    return (
        <div className="home text-container">
            <h1 className="game-title">Quizzical</h1>
            <p className="game-subtitle">Answer some random questions and have fun!</p>
            <button className="main-btn start-game-btn" onClick={props.handleViewChange} >Start quiz</button>
        </div>
    )
}