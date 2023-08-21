import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ListMovies, MovieItem } from './home.styled';
import { getTrendingMovies } from 'API/api';


const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Возвращает объект местоположения, представляющий текущий URL, каждый раз когда мы переходим по новому маршруту или обновляем часть текущего URL
  // то что в 2 уроке Репеты обьяснял
  // хук для того что б запомнить юрл когда мы будем проходить дальше по списку фильмов и открывать ревью и каст
  const location = useLocation();

  useEffect(() => {
    // опис функции гетДата 
    const getData = async () => {
      try {
        setLoading(true);
        // подтягиваем главную страницу фильмов
        const data = await getTrendingMovies();
        // в хук-функцию передаём данные которые подтянули
        setData(data);
        // console.dir(data)
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    // вызов функции
    getData();
  }, []);

  return (
    <>
      <ListMovies>
        <h2>Trending movies:</h2>
        {loading
          ? 'Loading...'
          : data.map(({ title, id }) => (
            <MovieItem key={id}>
              <Link
                to={`/movies/${id}`}
                // сохраняем место откуда мы пришли по этой ссылке
                state={{ from: location }}
              >
                {title}
              </Link>
            </MovieItem>
          ))}
      </ListMovies>
    </>
  );
};

export default Home;


// дом страница на которую фетчим трендинг фильмы