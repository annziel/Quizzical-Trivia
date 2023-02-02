import React, {useState, useEffect} from "react"

export default function Questions(props) {
// props.isAnswersChecked

const [questions, setQuestions] = useState([])

useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data => setQuestions(data.results))
    }, []
)

function escapeEncoding(text) {
    new DOMParser().parseFromString(text, "text/html").body.textContent
}

const questionsElements = questions.map(q => {
    return (
        <div className="question-box">
            <h2 className="question-text">{q.question}</h2>
            <div className="answers-container">
                <p className="answer-option">{q.correct_answer}</p>
                <p className="answer-option">{q.incorrect_answers[0]}</p>
                <p className="answer-option">{q.incorrect_answers[1]}</p>
                <p className="answer-option">{q.incorrect_answers[2]}</p>
            </div>
            <hr />
        </div>
    )
})

return (
    <div className="questions-container">
        {questionsElements}
    </div>
)
}