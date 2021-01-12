function Nominees({ list, removeMovie }) {
  return (
    <div>
      <h1>Nominations</h1>
      <ul>
        {list.map((movie) => (
          <li key={`${movie.Title} ${movie.Year}`}>
            {movie.Title} ({movie.Year})
            <button
              type="button"
              onClick={() => removeMovie({ Title: movie.Title, Year: movie.Year })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div >

  )
}

export default Nominees;