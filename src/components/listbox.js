import movieCamera from '../images/movie-camera.jpg'

function ListBox({ title, list, dispatch, buttonText }) {
  return (
    <div className="list-wrapper">
      <h2>{title}</h2>
      <ul>
        {list?.map((movie) => (
          <li className="row" key={`${movie.Title} ${movie.Year}`}>
            {
              movie.Poster !== 'N/A' ?
                <img src={movie.Poster} alt='Not Found' /> :
                <img src={movieCamera} alt='Alt Pic' />
            }
            <div className="row-text-button">
              <span className="row-text">{`${movie.Title} (${movie.Year})`}</span>
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