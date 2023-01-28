import { useState } from 'react'
import GithubIcon from './components/GithubIcon'
import './styles/App.scss'

import questions from './questions.json'

function App() {
   const questionsLength = questions.length

   const [currentQuestion, setCurrentQuestion] = useState(0)
   const [checkedAnswer, setCheckedAnswer] = useState('')
   const [points, setPoints] = useState(0)

   const handleCheck = (answer: string) => {
      setCheckedAnswer(answer)
   }

   const handleSubmit = () => {
      if (!checkedAnswer) return

      const currentQuestionAnswers = questions[currentQuestion - 1].answers
      for (let i = 0; i < currentQuestionAnswers.length; i++) {
         if (checkedAnswer === currentQuestionAnswers[i].answer) {
            if (currentQuestionAnswers[i].isCorrect === true) {
               setPoints(points + 1)
            }
            break
         }
      }

      setCheckedAnswer('')
      setCurrentQuestion(currentQuestion + 1)
   }

   const resetQuiz = () => {
    setPoints(0)
    setCurrentQuestion(0)
    setCheckedAnswer("")
   }

   return (
      <>
         <GithubIcon />
         <div className="App">
            <header>
               <div>
                  <h1>Quiz game</h1>
                  <p>
                     Made by <a href="https://github.com/fer1s">fer1s</a>
                  </p>
               </div>
               {currentQuestion >= 1 && currentQuestion <= questionsLength && (
                  <h1>
                     {currentQuestion}/{questionsLength}
                  </h1>
               )}
            </header>
            <div className="content">
               {currentQuestion < 1 && (
                  <div className='not_quiz'>
                     <h1>Welcome to quiz</h1>
                     <button onClick={() => setCurrentQuestion(1)}>Start</button>
                  </div>
               )}
               {currentQuestion > 0 && currentQuestion < questionsLength + 1 && (
                  <>
                     <h2 className="question">{questions[currentQuestion - 1].question}</h2>
                     <hr />
                     <div className="buttons">
                        {questions[currentQuestion - 1].answers.map((answer, index) => (
                           <button key={index} className={`answer ${checkedAnswer === answer.answer && 'active'}`} onClick={() => handleCheck(answer.answer)}>
                              {answer.answer}
                           </button>
                        ))}
                     </div>
                     <div className="center">
                        <button className="submit" onClick={handleSubmit} disabled={!checkedAnswer}>
                           Submit answer
                        </button>
                     </div>
                  </>
               )}
               {currentQuestion > questionsLength && <div className='not_quiz'>
                <h1>Quiz completed</h1>
                <p>Your score is {points} out of {questionsLength}.</p>
                <button onClick={resetQuiz}>Reset Quiz</button>
               </div>}
            </div>
         </div>
      </>
   )
}

export default App
