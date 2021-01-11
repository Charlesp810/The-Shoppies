import axios from 'axios'

//Action Type
const SEARCH_TITLE = 'SEARCH_TITLE'
//Action Creator
export const searchTitle = (title) => ({
  type: SEARCH_TITLE,
  payload: title
})
//Thunk

export const searchTitleThunk = (title) => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`http://www.omdbapi.com/?apikey=17fed5e6&type=movie&s=${title}`)
      dispatch(searchTitle(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {
  results: []
}

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TITLE:
      return { ...state, results: action.payload }
    default:
      return state;
  }
}