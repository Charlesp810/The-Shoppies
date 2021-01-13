

function ListBox({ title, list, dispatch, buttonText }) {
  return (
    <div className="list-wrapper">
      <h1>{title}</h1>
      <ul>
        {list.map((movie) => (
          <li className="row" key={`${movie.Title} ${movie.Year}`}>
            <img src={movie.Poster} alt="Not found" />
            <div className="row-text-button">
              <span>{movie.Title} ({movie.Year})</span>
              <button
                type="button"
                disabled={movie.isNominated ? true : undefined}
                onClick={() => dispatch({ Title: movie.Title, Year: movie.Year, Poster: movie.Poster })}
              >
                {buttonText}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListBox;