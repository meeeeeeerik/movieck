import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MoviePage, MainPage } from './pages';
import { useEffect } from 'react';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
export default App;
