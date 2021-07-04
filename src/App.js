import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {
    isWaiting,
    isLoading,
    questions,
    index,
    correct,
    nextQuestion,
    checkAnswer,
    closeModal
  } = useGlobalContext()
  if(isWaiting) {
    return (
      <SetupForm/>
    )
  }
  if(isLoading) {
    return (
      <Loading />
    )
  }
  
  const {correct_answer, incorrect_answers, question} = questions[index]
  // const multiChoice =[...incorrect_answers, correct_answer] 
 
  const multiChoice =[...incorrect_answers];
  const tempIndex = Math.floor(Math.random()*4);
  if(tempIndex === 3) {
    multiChoice.push(correct_answer);
  } else {
    multiChoice.push(multiChoice[tempIndex]);
    multiChoice[tempIndex] = correct_answer;
  }
  return (
    <main>
      <Modal/>
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct} /{index}{' '}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{__html: question}}/>
          <div className='btn-container'>
            {multiChoice.map((item, index) => {
              return ( 
                <button
                  onClick={() => checkAnswer(item)}
                  key={index}
                  className='answer-btn'
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              )
            })}
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
