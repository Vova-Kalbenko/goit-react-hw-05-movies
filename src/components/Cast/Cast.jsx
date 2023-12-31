import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieCast } from 'API/api'
import css from './Cast.module.css'
import PropTypes from 'prop-types';
import {AiOutlineUser} from 'react-icons/ai'


const Cast = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // хук useParams - Имя параметра будет именем свойства в объекте, а его текущее значение в адресе - значением свойства.
  const { movieId } = useParams();
  // console.log(useParams())

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { cast } = await getMovieCast(movieId);
        // сюда приходить массив обьёктов актёров которые снимаються в фильме
        // console.log(cast)
        setData(cast);
        setLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [movieId]);

  return (
    <>
      {loading ? (
        'Loading...'
      ) : data && data.length > 0 ? (
        <div>
          <ul className={css.castList}>
            {data.map(({ name, character, profile_path, id }) => (
              <li className={css.castListItem} key={id}>
                {profile_path ? (
                  <img
                    alt={name}
                    src={`https://image.tmdb.org/t/p/w92${profile_path}`}
                    width="140px"
                  />
                ) : (
                  <AiOutlineUser className={css.icon}/>
                )}

                <p className={css.castDescription}>{name}</p>
                <p className={css.castDescription}>{character}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={css.castDescription}>No data found</p>
      )}
    </>
  );
};

Cast.propTypes = {
  movieId: PropTypes.number,
};

export default Cast;