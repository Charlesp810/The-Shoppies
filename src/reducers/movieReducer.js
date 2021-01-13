//Action Type
const SEARCH_TITLE = 'SEARCH_TITLE'
const ADD_NOMINEE = 'ADD_NOMINEE'
const REMOVE_NOMINEE = 'REMOVE_NOMINEE'

//Action Creator
export const searchTitle = (data, Title) => ({
  type: SEARCH_TITLE,
  payload: { data, Title }
})

export const addNominee = (data) => ({
  type: ADD_NOMINEE,
  payload: data
})

export const removeNominee = (data) => ({
  type: REMOVE_NOMINEE,
  payload: data
})

export const initialState = {
  results: [],
  searched: '',
  nominatedList: []
}

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TITLE:
      return {
        ...state,
        results: action.payload.data.Search.map((movie) => {
          let isNominated = false;

          state.nominatedList.forEach((nominee) => {
            if (nominee.Title === movie.Title && nominee.Year === movie.Year) {
              isNominated = true
            }
          })
          if (isNominated) {
            movie.isNominated = true
          } else {
            movie.isNominated = false
          }
          return movie
        }),
        searched: action.payload.Title
      }
    case ADD_NOMINEE:
      if (state.nominatedList.length < 5) {
        return {
          ...state,
          nominatedList: [...state.nominatedList, { Title: action.payload.Title, Year: action.payload.Year, Poster: action.payload.Poster }],
          results: [...state.results.map((movie) => {
            if (movie.Title === action.payload.Title && movie.Year === action.payload.Year) {
              movie.isNominated = true
            }
            return movie
          })]
        }
      } else {
        return state
      }
    case REMOVE_NOMINEE:
      return {
        ...state,
        nominatedList: state.nominatedList.filter((movie) => {
          return movie.Title !== action.payload.Title && movie.Year !== action.payload.Year
        }),
        results: [...state.results.map((movie) => {
          if (movie.Title === action.payload.Title && movie.Year === action.payload.Year) {
            movie.isNominated = false
          }
          return movie
        })]
      }
    default:
      return state;
  }
}
