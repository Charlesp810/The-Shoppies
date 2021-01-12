

function Results({ results, searched, nominate }) {
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