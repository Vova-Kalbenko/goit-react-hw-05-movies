import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { getMovieDetails } from 'API/api';
// import css from './movie-details.module.css';
// import noMovieImg from '../../img/no-poster-available.jpg';

const MovieDetails = () => {
  const { movieId } = useParams();
  // console.log(useParams)

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setData(data);
        // console.dir(data)
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  const getYear = releaseDate => {
    // записываем в новую дату дату выхода фильма
    const date = new Date(releaseDate);
    // преобзаровываем это дату методом-функцией 
    return date.getFullYear();
  };

  const getGenres = arrGenres => {
    // console.log(arrGenres)
    return arrGenres.map(genre => genre.name).join(', ');
  };

  const location = useLocation();
// save place we Came FROM
  const comeBackLink = location.state?.from ?? '/';

  return (
    <>
      <Link to={comeBackLink}>
        Go Back
      </Link>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <div>
            {data.poster_path ? (
              <img
                alt={data.original_title}
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              />
            ) : (
              <img  src={'no movie title'} alt="not available" />
            )}

            <div>
              <h1>
                {data.original_title} ({getYear(data.release_date)})
              </h1>
              <p>
                User Score: {Math.round((data.vote_average * 10))}%
              </p>
              <p>Overview</p>
              <p>{data.overview}</p>
              <p >Genres</p>
              <p>{getGenres(data.genres)}</p>
            </div>
          </div>
          <div>
            <ul>
              <li>
                <Link to="cast" state={{ from: comeBackLink }}>
                  <button>Cast</button>
                </Link>
              </li>
              <li>
                <Link to="reviews" state={{ from: comeBackLink }}>
                  <button>Reviews</button>
                </Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </>
  );
};

export default MovieDetails;