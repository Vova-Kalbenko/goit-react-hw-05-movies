import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from 'API/api';
import css from './Reviews.module.css'

const Reviews = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { movieId } = useParams();
  // console.log(useParams())

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { results } = await getMovieReviews(movieId);
        // console.log(results)
        setData(results);
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
        <div >
          <ul className={css.reviewsList}>
            {data.map(({ author, content, id }) => (
              <li key={id} >
                <h3 className={css.reviewsDescriptionAuthor}>{author}</h3>
                <p className={css.reviewsDescription}>{content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className={css.reviewsDescription} >No reviews found</p>
      )}
    </>
  );
};

export default Reviews;