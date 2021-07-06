import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const { isError, errorMessage, quiz, handleChange, handleSubmit } =
    useGlobalContext()
  const {amount, category, difficulty} = quiz;
  return (
    <main>
      <section className='quiz quiz-small'>
        <form action='' className='setup-form' onSubmit={handleSubmit}>
          <h2>Setup your quiz</h2>
          <div className='form-control'>
            <label htmlFor='amount'>number of questions</label>
            <input
              type='number'
              name='amount'
              id='amount'
              className='form-input'
              value={amount}
              onChange={handleChange}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='category'>category</label>
            <select
              name='category'
              id='category'
              className='form-input'
              value={category}
              onChange={handleChange}
            >
              <option value='Science: Computers'>Science: Computers</option>
              <option value='sports'>sports</option>
              <option value='history'>history</option>
              <option value='politics'>politics</option>
              <option value='Entertainment: Music'>Entertainment: Music</option>
              <option value='Celebrities'>Celebrities</option>
              <option value='General Knowledge'>General Knowledge</option>
            </select>
          </div>
          <div className='form-control'>
            <label htmlFor='difficulty'>select difficulty</label>
            <select
              name='difficulty'
              id='difficulty'
              className='form-input'
              value={difficulty}
              onChange={handleChange}
            >
              <option value='easy'>easy</option>
              <option value='medium'>medium</option>
              <option value='hard'>hard</option>
            </select>
          </div>
          {isError && <p className='error'>{errorMessage}</p>}
          <button type='submit' className='submit-btn'>
            start
          </button>
        </form>
      </section>
    </main>
  ) 
  }
export default SetupForm
