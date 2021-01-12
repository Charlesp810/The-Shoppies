// import { useState, useReducer } from 'react'

function Results({ results, searched, nominate }) {
  // const [selectNominee, setSelectedNominee] = useState([])
  // const handleClick = (e) => {
  //   e.preventDefault()
  //   // setSelectedNominee(selectNominee.push(e.target.value))
  //   console.log('here', e.target.value)
  // }

  return (
    <div>
      <h1>Results for {searched}</h1>
      <ul>
        {results.map((movie) => (
          <li key={`${movie.Title} ${movie.Year}`}>
            {movie.Title} ({movie.Year})
            <button
              type="button"
              disabled={movie.isNominated ? true : undefined}
              onClick={() => nominate({ Title: movie.Title, Year: movie.Year })}
            >
              Nominate
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Results;