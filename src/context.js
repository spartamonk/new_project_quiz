import axios from 'axios'
import React, { useReducer, useContext, useEffect } from 'react'
import useFetch from './useFetch'
import { reducer } from './reducer'
import { NEXT_QUESTION, CHECK_ANSWER, CLOSE_MODAL, SET_QUIZ } from './actions'

const table = {
  'Science: Computers': 18,
  sports: 21,
  history: 23,
  politics: 24,
  'Entertainment: Music': 12,
  Celebrities: 26,
  'General Knowledge': 9,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?type=multiple'

const url = ''

const AppContext = React.createContext()

const initialState = {
  index: 0,
  correct: 0,
  isShowModal: false,
  quiz: {
    amount: 10,
    category: 'Science: Computers',
    difficulty: 'easy',
  },
}
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {amount, category, difficulty} = state.quiz
  const {
    isWaiting,
    setIsWaiting,
    isLoading,
    isError,
    errorMessage,
    questions,
    handleSubmit
  } = useFetch(
    `&amount=${amount}&category=${
      table[category]
    }&difficulty=${difficulty}`
  )

  const nextQuestion =()=> {
    
    dispatch({ type: NEXT_QUESTION, payload: {length: questions.length, nextPage: state.index+1}})
  }
  const checkAnswer =(value)=> {
    if(value) {
      dispatch({ type: CHECK_ANSWER, payload: value })
    }
    dispatch({
      type: NEXT_QUESTION,
      payload: { length: questions.length, nextPage: state.index + 1 },
    })
  }
const closeModal =()=> {
  setIsWaiting(true);
  dispatch({ type: CLOSE_MODAL })
}
const handleChange=(e)=> {
   const name = e.target.name
   const value = e.target.value
  dispatch({ type: SET_QUIZ, payload: {name, value} })
  
}

  return (
    <AppContext.Provider
      value={{
        ...state,
        isLoading,
        isWaiting,
        isError,
        errorMessage,
        questions,
        nextQuestion,
        checkAnswer,
        closeModal,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
