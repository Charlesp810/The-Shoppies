import { useState } from 'react'
import { searchTitleThunk } from './reducers/movieReducer'
import { useDispatch } from 'react-redux'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchTitleThunk(searchInput))
  }
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search Movie  Title" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;
