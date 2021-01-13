function Nominees({ list, removeMovie }) {
  return (
    <div className="list-wrapper">
      <h1>Nominations</h1>
      <ul>
        {list.map((movie) => (
          <li className="row" key={`${movie.Title} ${movie.Year}`}>
            <img src={movie.Poster} alt="Not Found" />
            <div className="row-text-button">
              <span>{movie.Title} ({movie.Year})</span>
              <button
                type="button"
                onClick={() => removeMovie({ Title: movie.Title, Year: movie.Year })}
              >
                Remove
            </button>
            </div>
          </li>
        ))}
      </ul>
    </div >

  )
}

export default Nominees;