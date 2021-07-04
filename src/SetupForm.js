import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const {
    handleChange,
    handleSubmit,
    amount,
    category,
    difficulty,
    isError,
    errorMsg,
  } = useGlobalContext()

  return (
    <section className='quiz quiz-small'>
      <form className='setup-form' onSubmit={handleSubmit}>
        <h2>setup quiz</h2>
        <div className='form-control'>
          <label htmlFor='amount'>number of questions</label>
          <input
            type='number'
            className='form-input'
            name='amount'
            minLength='1'
            maxLength='50'
            value={amount}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='category'>
            <select
              name='category'
              id='category'
              className='form-input'
              value={category}
              onChange={handleChange}
            >
              <option value='sports'>sports</option>
              <option value='history'>history</option>
              <option value='politics'>politics</option>
            </select>
          </label>
        </div>
        <div className='form-control'>
          <label htmlFor='difficulty'>select difficulty</label>
          <select
            name='difficulty'
            id='difficulty'
            className='form-input'
            onChange={handleChange}
            value={difficulty}
          >
            <option value='easy'>easy</option>
            <option value='medium'>medium</option>
            <option value='hard'>hard</option>
          </select>
        </div>
        {
          isError && <p className="error">{errorMsg}</p>
        }
        <button className='submit-btn' type='submit'>
          start
        </button>
      </form>
    </section>
  )
}
export default SetupForm
