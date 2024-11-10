import { useEffect } from 'react';
import MovieApi from './api';

const genreById = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  horror: 27,
  thriller: 53,
  fantasy: 14,
  history: 36,
};

function App() {
  useEffect(() => {
    MovieApi.search('Saw').then((response) =>
      console.log(response)
    );
  }, []);

  return <div className="App">hi</div>;
}

export default App;
