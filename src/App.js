import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
import useFetch from './useFetch'
function App() {
  const {
    isLoading,
    isWaiting,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
  } = useGlobalContext()
  if(isWaiting) {
    return <SetupForm />
  }
  if(isLoading) {
    return <Loading />
  }
  const {question, incorrect_answers, correct_answer} = questions[index];
  const answers= [...incorrect_answers]
  const tempIndex = Math.floor(Math.random()*4);
  if(tempIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer
    
  }
  
  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct} / {index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }} />
          <div className='btn-container'>
            {answers.map((answer, index) => (
              <button
                key={index}
                className='answer-btn'
                dangerouslySetInnerHTML={{ __html: answer }}
                onClick={() => checkAnswer(answer===correct_answer)}
              />
            ))}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  )
}

export default App
