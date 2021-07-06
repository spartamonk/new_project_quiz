import { NEXT_QUESTION, CHECK_ANSWER, CLOSE_MODAL, SET_QUIZ } from './actions'

 
export const reducer = (state, action) => {

  switch (action.type) {
    case NEXT_QUESTION:
      if(action.payload.nextPage > action.payload.length-1) {
       return {
         ...state,
         index: 0,
         isShowModal: true
       }
      } else {
       return {
        ...state,
        index: action.payload.nextPage
       }
      }
      case CHECK_ANSWER: 
      return {
       ...state,
       correct: state.correct + 1
      }
      case CLOSE_MODAL:
       return {
        ...state,
        correct: 0,
        isShowModal: false,
       }
       case SET_QUIZ:
       
        return {
         ...state,
         quiz: {...state.quiz, [action.payload.name]:action.payload.value}
        }
    default:
      throw new Error(`no matching type "${action.type}" found`)
  }
}
