import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { searchMovie } from 'API/api';
import css from './Movies.module.css'
import {BsFillSendCheckFill} from 'react-icons/bs'
const Movies = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query');

  const [query, setQuery] = useState(() => searchQuery || '');

  const location = useLocation();
  // console.log(location)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { results } = await searchMovie(searchQuery);
        // console.log(results)
        setData(results);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (searchQuery) {
      getData();
    }
  }, [searchQuery]);

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ query: query });
  };

  return (
    <>
      <div className={css.moviesSearchContainer}>
        <h2 >Search movies:</h2>

        <form onSubmit={handleSubmit} className={css.socialMessangersForm}>
          <input
            value={query}
            onChange={handleChange}
            name="search"
            type="text"
            placeholder="Type here"
            className={css.socialMessangersInput}
          />
          <button type="submit" className={css.searchButton}>
            <BsFillSendCheckFill className={css.searchButtonIcon}/>
          </button>
        </form>
      </div>
      <ul className={css.movieslist} >
        {searchQuery ? (
          loading ? (
            'Loading...'
          ) : data.length > 0 ? (
            data.map(({ title, id }) => (
              <li key={id} >
                <Link state={{ from: location }} to={`/movies/${id}`}>
                  <p className={css.moviesName}>{title}</p>
                </Link>
              </li>
            ))
          ) : (
            <p>
              No movies with this title were found. Try entering another title
            </p>
          )
        ) : (
          <p></p>
        )}
      </ul>
    </>
  );
};

export default Movies;



