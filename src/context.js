import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [isWaiting, setIsWaiting] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState({
    isError: false,
    errorMsg: '',
  })
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  })
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchQuestions = async (url) => {
    setIsWaiting(false)
    setIsLoading(true)
    try {
      const response = await axios(url).catch((err) => console.log(err))
      if (response) {
        const data = response.data.results
        if (data.length > 0) {
          setQuestions(data)
          setIsWaiting(false)
          setIsLoading(false)
          setError({ ...error, isError: false })
        } else {
          setIsWaiting(true)
          setError({
            isError: true,
            errorMsg: 'cant generate questions please try different options',
          })
        }
      } else {
        setIsWaiting(true)
      }
    } catch (error) {
      console.log(error)
      isLoading(false)
    }
  }

  const nextQuestion = () => {
    setIndex((currValue) => {
      const index = currValue + 1
      if (index > questions.length - 1) {
        openModal()
        return 0
      } else {
        return index
      }
    })
  }

  const checkAnswer = (ans) => {
    const answer = questions.find((item) => item.correct_answer === ans)

    if (answer) {
      setCorrect((currValue) => currValue + 1)
    }
    nextQuestion()
  }
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsWaiting(true)
    setCorrect(0)
    setIsModalOpen(false)
  }
  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setQuiz({ ...quiz, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const { amount, category, difficulty } = quiz


    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
    fetchQuestions(url);
  }
  // useEffect(() => {
  //   fetchQuestions(tempUrl)
  // }, [])

  return (
    <AppContext.Provider
      value={{
        isWaiting,
        isLoading,
        questions,
        index,
        correct,
        ...error,
        isModalOpen,
        setIndex,
        setIsModalOpen,
        setCorrect,
        nextQuestion,
        checkAnswer,
        closeModal,
        ...quiz,
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
