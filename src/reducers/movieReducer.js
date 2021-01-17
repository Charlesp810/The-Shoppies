//Action Type
const SEARCH_TITLE = 'SEARCH_TITLE'
const ADD_NOMINEE = 'ADD_NOMINEE'
const REMOVE_NOMINEE = 'REMOVE_NOMINEE'
const CHECK_LOCALSTORAGE = 'CHECK_LOCALSTORAGE'

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

export const checkLocalStorage = () => ({
  type: CHECK_LOCALSTORAGE
})

export const initialState = {
  results: [],
  searched: '',
  nominatedList: []
}

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_LOCALSTORAGE:
      const localStorageState = JSON.parse(localStorage.getItem('state'))

      return localStorageState ? {
        ...state,
        nominatedList: localStorageState.nominatedList
      } : initialState
    case SEARCH_TITLE:

      const url = new URL(window.location.href)

      if (action.payload.Title) {
        url.searchParams.set('search', action.payload.Title)
      } else {
        url.searchParams.delete('search')
      }
      window.history.pushState({}, "", url)

      return {
        ...state,
        results: action.payload.data.Search?.map((movie) => {
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
        }) ?? [],
        searched: action.payload.Title
      }
    case ADD_NOMINEE:
      if (state.nominatedList.length < 5) {
        const updatedList = [...state.nominatedList, { Title: action.payload.Title, Year: action.payload.Year, Poster: action.payload.Poster }]

        const nominatedQueryParam = updatedList.reduce((a, b) => {
          return a + `${b.Title}/${b.Year},`
        }, '')

        const url = new URL(window.location.href)
        url.searchParams.set('nominated', nominatedQueryParam.slice(0, -1))
        window.history.pushState({}, "", url)

        localStorage.setItem("state", JSON.stringify({ nominatedList: updatedList }))

        return {
          ...state,
          nominatedList: updatedList,
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
      const filteredList = state.nominatedList.filter((movie) => {
        return movie.Title !== action.payload.Title && movie.Year !== action.payload.Year
      })


      const removeQueryParam = filteredList.reduce((a, b) => {
        return a + `${b.Title}+${b.Year},`
      }, '')

      const urlString = new URL(window.location.href)

      if (removeQueryParam) {
        urlString.searchParams.set('nominated', removeQueryParam)
      } else {
        urlString.searchParams.delete('nominated')
      }
      window.history.pushState({}, "", urlString)


      localStorage.setItem("state", JSON.stringify({ nominatedList: [...filteredList] }))
      return {
        ...state,
        nominatedList: filteredList,
        results: state.results.length ? [...state.results.map((movie) => {
          if (movie.Title === action.payload.Title && movie.Year === action.payload.Year) {
            movie.isNominated = false
          }
          return movie
        })] : []
      }
    default:
      return state;
  }
}
