import styled from 'styled-components';

export const HeaderTitle = styled.h2`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 200px;
`;

export const ListMovies = styled.ul`
  list-style-type: none;
  margin-bottom: 10px;
  font-size: 20px;
  padding-left: 150px;
  padding-right: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
`;

export const MovieItem = styled.li`
width: 230px;
`;

export const HomeMovieDescription = styled.p `
    color: #111;
    letter-spacing: -.64px;
    max-width: 180px;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 4px;
    font-size: 16px;
    font-weight: 700;
    line-height: 18px;
    overflow: hidden;
    text-decoration: none;
    padding-top: 8px;
`
