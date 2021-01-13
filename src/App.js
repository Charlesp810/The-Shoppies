import { useState, useReducer } from 'react'
import movieReducer, { initialState, searchTitle, addNominee, removeNominee } from './reducers/movieReducer'
import { useDispatch } from 'react-redux'
import ListBox from './components/listbox'
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
        <ListBox
          title={`Results for ${state.searched}`}
          list={state.results}
          dispatch={(data) => {
            dispatch(addNominee(data))
          }}
          buttonText={'nominate'}
        />
        <ListBox
          title={'Nominations'}
          list={state.nominatedList}
          dispatch={(data) => {
            dispatch(removeNominee(data))
          }}
          buttonText={'remove'}
        />
      </div>
    </div>
  );
}

export default App;
