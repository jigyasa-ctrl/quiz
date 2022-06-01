
import './App.css';
import Recat, { useState } from 'react'

import Quiz from './Components/Quiz'
function App() {
  const [timer1, setTimer1] = useState(20)
  const [timer2, setTimer2] = useState(20)
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)
  const [start1, setStart1] = useState(false)
  const [start2, setStart2] = useState(false)
  const [questionsQuiz1, setQuestionsQuiz1] = useState([])
  const [questionsQuiz2, setQuestionsQuiz2] = useState([])
  return (
    <div className="App">
      <div className="quiz">
        <Quiz timer={timer1} setTimer={setTimer1} score={score1} setScore={setScore1} start={start1} setStart={setStart1} questionsQuiz={questionsQuiz1} setQuestionsQuiz={setQuestionsQuiz1} />
        <Quiz timer={timer2} setTimer={setTimer2} score={score2} setScore={setScore2} start={start2} setStart={setStart2} questionsQuiz={questionsQuiz2} setQuestionsQuiz={setQuestionsQuiz2} />
      </div>


    </div>
  );
}

export default App;
