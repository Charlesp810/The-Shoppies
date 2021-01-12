import { useState, useReducer } from 'react'
import movieReducer, { initialState, searchTitle } from './reducers/movieReducer'
import { useDispatch } from 'react-redux'
import Results from './components/results'
import axios from 'axios'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [state, dispatch] = useReducer(movieReducer, initialState)
  const dispatchThunk = useDispatch()
  let handleSubmit = (e) => {
    e.preventDefault()

    dispatchThunk(async () => {
      try {
        const { data } = await axios.get(`http://www.omdbapi.com/?apikey=17fed5e6&type=movie&s=${searchInput}`)
        dispatch(searchTitle(data, searchInput))
      } catch (err) {
        console.log(err)
      }
    })
  }

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search Movie  Title" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
        <button type="submit">Search</button>
      </form>
      <div className="results-container">
        <Results results={state.results} searched={state.searched} />
      </div>
    </div>

  );
}

export default App;
