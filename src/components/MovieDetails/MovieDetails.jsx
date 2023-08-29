import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { getMovieDetails } from 'API/api';
import {BsArrowLeftCircle} from 'react-icons/bs'
import css from './MovieDetails.module.css'


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
    <div className={css.movieDetailsContainer}>
      <Link to={comeBackLink} className={css.comeBackLink}>
        <BsArrowLeftCircle/> Go Back
      </Link>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <div className={css.movieDetailsWrapper}>
            {data.poster_path ? (
              <img
                alt={data.original_title}
                src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              />
            ) : (
              <img  src={'no movie title'} alt="not available" />
            )}

            <div>
              <h1 className={css.MovieDetailsTitle}>
                {data.original_title} ({getYear(data.release_date)})
              </h1>
              <p className={css.MovieDetailsDescription}>
                User Score: {Math.round((data.vote_average * 10))}%
              </p>
              <p className={css.MovieDetailsDescription}>Overview</p>
              <p className={css.MovieDetailsDescription}>{data.overview}</p>
              <p className={css.MovieDetailsDescription} >Genres</p>
              <p className={css.MovieDetailsDescription}>{getGenres(data.genres)}</p>
            </div>
          </div>
          <div>
            <ul>
              <li>
                <Link to="cast" state={{ from: comeBackLink }}>
                  <button className={css.MovieDetailsBtn}>Cast</button>
                </Link>
              </li>
              <li>
                <Link to="reviews" state={{ from: comeBackLink }}>
                  <button className={css.MovieDetailsBtn}>Reviews</button>
                </Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<div>Loading subpage...</div>}>
            <Outlet />
          </Suspense>
        </>
      )}
    </div>
  );
};

export default MovieDetails;