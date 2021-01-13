import { useState, useReducer } from 'react'
import movieReducer, { initialState, searchTitle, addNominee, removeNominee } from './reducers/movieReducer'
import { useDispatch } from 'react-redux'
import Results from './components/results'
import Nominees from './components/nominees'
import Banner from './components/banner'
import './App.css'
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
      <h1>Welcome to the Shoppies!</h1>
      {
        state.nominatedList.length === 5 &&
        <Banner />
      }
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="search-field"
          type="text"
          placeholder="Search Movie Title"
          value={searchInput} onChange={(event) => setSearchInput(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="sub-container">
        {
          <Results
            results={state.results}
            searched={state.searched}
            nominate={(data) => {
              dispatch(addNominee(data))
            }
            }
          />
        }
        <Nominees
          list={state.nominatedList}
          removeMovie={(data) => {
            dispatch(removeNominee(data))
          }
          }
        />
      </div>
    </div>
  );
}

export default App;
