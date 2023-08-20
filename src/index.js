import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/goit-react-hw-05-movies">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// apikey = 3a066ead77d8f95f2033fe7dd99dc039
// key reference api = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTA2NmVhZDc3ZDhmOTVmMjAzM2ZlN2RkOTlkYzAzOSIsInN1YiI6IjY0ZGY2ZGIxZDEwMGI2MTRiMTVhY2MxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lE0gmNj-sE-4tVzgTR36fdHCc_u6xBt9-wjpqWUrXJg