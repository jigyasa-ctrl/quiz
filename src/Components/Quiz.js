import React, { useState, useEffect } from 'react'
import quiz from '../quiz.png'
function Quiz(props) {
    const { timer, setTimer, score, setScore, start, setStart, questionsQuiz, setQuestionsQuiz } = props
    const operations = ['add', 'sub', 'mul', 'divide'];
    const [randomValue, setRandomValue] = useState(Math.floor(Math.random() * 11))
    const [secondRandomValue, setSecondRandomValue] = useState(Math.floor(Math.random() * 11))
    const [next, setNext] = useState(false)
    const [sign, setSign] = useState(Math.floor(Math.random() * operations.length))
    const [answer, setAnswer] = useState()
    const [currentQuestion, setCurrentQuestion] = useState('')
    const [checkAnswer, setCheckAnswer] = useState()
    const [questionCount, setquestionCount] = useState(1)
    let interval;
    let question;
    function startQuiz() {
        setStart(true);
    }
    function playAgain() {
        setScore(0);
        setStart(true)
        setNext(false)
        setquestionCount(1)
        setQuestionsQuiz([])
    }
    function Next() {
        if (checkAnswer && Math.floor(answer) === JSON.parse(checkAnswer)) {
            setScore(score + 1);

        }
        clearTimeout(interval)
        setTimer(20);
        if (questionCount < 20) {
            setNext(true);
            setquestionCount(questionCount + 1)
            setSign(Math.floor(Math.random() * operations.length))
            setSecondRandomValue(Math.floor(Math.random() * 11));
            setRandomValue(Math.floor(Math.random() * 11));
            setCheckAnswer('');

        } else {
            setNext(false);
            setStart(false)
        }


    }
    function CheckAnswer(value) {
        setCheckAnswer(value);


    }
    useEffect(() => {

        if (start) {
            setNext(true)
            clearTimeout(interval)
            if (timer !== 0) {
                interval = setTimeout(() => {
                    setTimer(timer - 1)
                }, 1000);
            } else {
                clearTimeout(interval)
                Next()

            }

        }

    }, [start, timer])

    useEffect(() => {

        if (checkAnswer && answer && answer == JSON.parse(checkAnswer)) {
            question = `${currentQuestion} = ${answer} C`
            setQuestionsQuiz([...questionsQuiz, question]);
        } else if (answer) {
            question = `${currentQuestion} = ${answer} W`
            setQuestionsQuiz([...questionsQuiz, question]);
        }



    }, [answer])

    useEffect(() => {
        operations.map((value) => {
            if (value == operations[sign]) {

                switch (value) {

                    case 'add':
                        question = `${randomValue} + ${secondRandomValue}`
                        setCurrentQuestion(question)
                        setAnswer(randomValue + secondRandomValue)

                        return;
                    case 'sub':
                        question = `${randomValue} - ${secondRandomValue}`
                        setAnswer(Math.floor(randomValue - secondRandomValue))
                        setCurrentQuestion(question)
                        return;
                    case 'mul':
                        question = `${randomValue} * ${secondRandomValue}`
                        setAnswer(Math.floor(randomValue * secondRandomValue))
                        setCurrentQuestion(question)

                        return;
                    case 'divide':
                        question = `${randomValue} / ${secondRandomValue}`
                        setAnswer(Math.floor(randomValue / secondRandomValue))
                        setCurrentQuestion(question)
                        return;


                }

            }

        })
    }, [start, randomValue, secondRandomValue, sign])


    return (
        <div className="quiz-modal">


            {start ? (
                <div>
                    <p>Timer: {timer}</p>
                    <p>{questionCount}. Question: {currentQuestion}</p>
                    <input type="text" name="answer" onChange={(e) => CheckAnswer(e.target.value)} value={checkAnswer} />

                </div>) : questionCount == 20 ?

                    <>
                        <div className="answer-modal">
                            <h3>Answers</h3>
                            {questionsQuiz.map((value) => {
                                if (value.includes("W")) {
                                    return <p style={{ color: 'red' }}>{value.replace("W", "")}</p>
                                }
                                if (value.includes("C")) {
                                    return <p style={{ color: 'lightgreen' }}>{value.replace("C", "")}</p>
                                }

                            })}
                        </div>

                        <button className="quiz-button" onClick={playAgain}>Play Again</button>
                    </>
                    :
                    <>

                        <img src={quiz} height="50%" width="50%"></img>
                        <button className="quiz-button" onClick={startQuiz}>Start Quiz</button>
                    </>



            }
            <p>Score: {score}</p>
            {next ? <button className="quiz-button" onClick={Next}>Next Question</button> : null}



        </div>
    );
}

export default Quiz;
