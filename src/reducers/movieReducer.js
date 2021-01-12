//Action Type
const SEARCH_TITLE = 'SEARCH_TITLE'
const ADD_NOMINEE = 'ADD_NOMINEE'

//Action Creator
export const searchTitle = (data, Title) => ({
  type: SEARCH_TITLE,
  payload: { data, Title }
})

export const addNominee = (data) => ({
  type: ADD_NOMINEE,
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
            if (nominee.Title === movie.Title) {
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
      console.log('this is data: ', action.payload)
      return {
        ...state,
        nominatedList: [...state.nominatedList, { Title: action.payload.Title, Year: action.payload.Year }],
        results: [...state.results.map((movie) => {
          if (movie.Title === action.payload.Title && movie.Year === action.payload.Year) {
            movie.isNominated = true
          }
          return movie
        })]
      }
    default:
      return state;
  }
}
