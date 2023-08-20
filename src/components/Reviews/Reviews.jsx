import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from 'API/api';
// import css from './reviews.module.css';

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
          <ul >
            {data.map(({ author, content, id }) => (
              <li key={id} >
                <p>{author}</p>
                {content}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p >No reviews found</p>
      )}
    </>
  );
};

export default Reviews;