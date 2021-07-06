import axios from 'axios'
import React, { useEffect, useState } from 'react'

const API_ENDPOINT = 'https://opentdb.com/api.php?type=multiple'

const useFetch = (urlParams) => {
 const [isWaiting, setIsWaiting] = useState(true);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState({
   isError: false,
   errorMessage: "Can't Generate Questions, Please Try Different Options",
 })
 const [questions, setQuestions] = useState([])
  const fetchQuestions = async (url) => {
   setIsLoading(true);
   setIsWaiting(false);
   const response = await axios(url).catch(error=> console.log(error));
   if(response) {
    const data = response.data.results
    if(data.length > 0) {
     setQuestions(data);
     setIsWaiting(false);
     setIsLoading(false);
     setError({...error, isError: false});
    } else {
     setError({...error, isError:true});
     setIsWaiting(true)
     setIsLoading(false)
    } 
    
   }
   else {
    setIsWaiting(true);
    setIsLoading(false)
   }
  }
 
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchQuestions(`${API_ENDPOINT}${urlParams}`)
  }
  return {
    isWaiting,
    setIsWaiting,
    isLoading,
    setIsLoading,
    ...error,
    questions,
    setQuestions,
    handleSubmit,
  }
}

export default useFetch
