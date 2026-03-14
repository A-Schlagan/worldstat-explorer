import React, { useState, useEffect } from "react"
import Navbar from "../components/Navbar.js"
import "../styles/global.css"

export default function Quiz() {
    const [countries, setCountries] = useState([])
    const [question, setQuestion] = useState(null)
    const [score, setScore] = useState(3)
    const [gameOver, setGameOver] = useState(false)
    const [feedback, setFeedback] = useState(null)
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags")
                const data = await response.json()
                setCountries(data)
                generateNewQuestion(data)
            } catch (error) {
                console.error("Fehler beim Laden", error)
            }
        }
        fetchCountries()
    }, [])

    const generateNewQuestion = (countryList = countries) => {
        if (countryList.length === 0) return

        setFeedback(null)
        setSelectedAnswer(null)

        const shuffled = [...countryList].sort(() => 0.5 - Math.random())
        const fourOptions = shuffled.slice(0, 4)
        const correctCountry = fourOptions[Math.floor(Math.random() * 4)]

        setQuestion({
            flagUrl: correctCountry.flags.svg,
            correctName: correctCountry.name.common,
            options: fourOptions.map(c => c.name.common)
        })
    }

    const handleAnswer = (clickedName) => {
        if (feedback || gameOver) return

        setSelectedAnswer(clickedName)

        if (clickedName === question.correctName) {
            setFeedback("correct")
            setScore(prev => prev + 1)
            setTimeout(() => generateNewQuestion(), 1500)
        } else {
            setFeedback("wrong")
            const newScore = score - 1
            setScore(newScore)

            if (newScore <= 0) {
                setTimeout(() => setGameOver(true), 2500)
            } else {
                setTimeout(() => generateNewQuestion(), 3000)
            }
        }
    }

    const restartGame = () => {
        setScore(3)
        setGameOver(false)
        generateNewQuestion()
    }

    return (
        <main className="mainStyle">
            <Navbar />

            <h1>Flaggen-Quiz</h1>
            <p className="quizRules">
                Regeln: Start mit 3 Punkten. Richtige Antwort +1 Punkt, Falsche Antwort -1 Punkt. Bei 0 ist das Spiel vorbei!
            </p>

            <div className="countryCard quizCard">

                {gameOver ? (
                    <div className="gameOverContainer">
                        <h2 className="gameOverTitle">Game Over!</h2>
                        <p className="gameOverText">Du hast leider verloren.</p>
                        <button className="quizButton" onClick={restartGame}>
                            Neues Spiel starten
                        </button>
                    </div>
                ) : !question ? (
                    <h2 className="loadingText">Lade Quiz...</h2>
                ) : (
                    <>
                        <div className={`scoreDisplay ${score > 2 ? "scoreHigh" : score === 2 ? "scoreMed" : "scoreLow"}`}>
                            Punkte: {score}
                        </div>

                        <img
                            src={question.flagUrl}
                            alt="Welche Flagge ist das?"
                            className="quizFlag"
                        />

                        <div className="optionsGrid">
                            {question.options.map((optionName, index) => {
                                let btnClass = "optionBtn"
                                if (feedback) {
                                    if (optionName === question.correctName) {
                                        btnClass += " correct"
                                    } else if (optionName === selectedAnswer) {
                                        btnClass += " wrong"
                                    } else {
                                        btnClass += " unselected"
                                    }
                                }

                                return (
                                    <button
                                        key={optionName}
                                        onClick={() => handleAnswer(optionName)}
                                        className={btnClass}
                                        disabled={!!feedback} 
                                    >
                                        {optionName}
                                    </button>
                                )
                            })}
                        </div>

                        <div className="feedbackContainer">
                            {feedback === "correct" && <h2 className="feedbackCorrect">Richtig! (+1)</h2>}
                            {feedback === "wrong" && (
                                <div className="feedbackWrongContainer">
                                    <h2 className="feedbackWrong">Falsch! (-1)</h2>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    )
}