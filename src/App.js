import { useState, useReducer, useEffect } from 'react'
import movieReducer, { initialState, searchTitle, addNominee, removeNominee, checkLocalStorage } from './reducers/movieReducer'
import { useDispatch } from 'react-redux'
import ListBox from './components/listbox'
import Banner from './components/banner'
import { ReactComponent as Search } from './search.svg';
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

  useEffect(() => {
    if (window.location.search) {
      const currentUrl = window.location.search.slice(1)
      const urlStr = decodeURIComponent(currentUrl).split('&');

      urlStr.forEach((urlParam) => {
        const seperatedParams = urlParam.split('=')
        if (seperatedParams[0] === 'search') {
          setSearchInput(seperatedParams[1])
          dispatchThunk(async () => {
            try {
              const { data } = await axios.get(`https://www.omdbapi.com/?apikey=17fed5e6&type=movie&s=${seperatedParams[1]}`)
              dispatch(searchTitle(data, seperatedParams[1]))
            } catch (err) {
              console.log(err)
            }
          })
        } else if (seperatedParams[0] === 'nominated') {
          const nomineeList = seperatedParams[1].split(',')
          nomineeList.forEach((nominee) => {
            nominee = nominee.split('/')
            const nomineeTitle = nominee[0]
            const nomineeYear = nominee[1]

            dispatchThunk(async () => {
              try {
                const { data } = await axios.get(`https://www.omdbapi.com/?apikey=17fed5e6&t=${nomineeTitle}&y=${nomineeYear}`)
                dispatch(addNominee(data))
              } catch (err) {
                console.log(err)
              }
            })
          })
        }
      })
    } else {
      dispatch(checkLocalStorage())
    }
  }, [])

  return (
    <div className="App">
      <h1>The Shoppies</h1>
      {
        state.nominatedList.length === 5 &&
        <Banner />
      }
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          className="search-field"
          type="text"
          placeholder="Search Movie Title..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <Search className="magnifying-glass" />
        <button type="submit">Search</button>
      </form>
      <div className="sub-container">
        <ListBox
          title={`Results for ${state.searched}`}
          list={state.results}
          dispatch={(data) => {
            dispatch(addNominee(data))
          }}
          buttonText={'Nominate'}
        />
        <ListBox
          title={'Nominations'}
          list={state.nominatedList}
          dispatch={(data) => {
            dispatch(removeNominee(data))
          }}
          buttonText={'Remove'}
        />
      </div>
    </div>
  );
}

export default App;
