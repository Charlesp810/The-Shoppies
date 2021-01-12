//Action Type
const SEARCH_TITLE = 'SEARCH_TITLE'

//Action Creator
export const searchTitle = (data, title) => ({
  type: SEARCH_TITLE,
  payload: { data, title }
})

export const initialState = {
  results: [],
  searched: ''
}

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_TITLE:
      return {
        ...state,
        results: action.payload.data.Search,
        searched: action.payload.title
      }
    default:
      return state;
  }
}