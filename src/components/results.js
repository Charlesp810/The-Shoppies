

function Results({ results, searched, nominate }) {
  return (
    <div className="list-wrapper">
      <h1>Results for {searched}</h1>
      <ul>
        {results.map((movie) => (
          <li className="row" key={`${movie.Title} ${movie.Year}`}>
            <img src={movie.Poster} alt="Not found" />
            <div className="row-text-button">
              <span>{movie.Title} ({movie.Year})</span>
              <button
                type="button"
                disabled={movie.isNominated ? true : undefined}
                onClick={() => nominate({ Title: movie.Title, Year: movie.Year, Poster: movie.Poster })}
              >
                Nominate
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Results;