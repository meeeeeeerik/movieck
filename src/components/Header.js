import { useEffect, useRef, useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { Input } from './input';
import { debounce } from '../utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isHeaderFloat, setIsHeaderFloat] = useState(false);

  const searchInputRef = useRef();

  useEffect(() => {
    const onScroll = debounce(() => {
      if (window.scrollY > 50) {
        setIsHeaderFloat(true);
      } else {
        setIsHeaderFloat(false);
      }
    }, 50);

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    const onInput = debounce((event) => {
      const value = event.target.value;

      navigate(value ? `/search?q=${value}` : '/');
    }, 1000);

    const searchInput = searchInputRef.current;

    if (searchInputRef.current) {
      searchInput.addEventListener('input', onInput);
    }

    return () => {
      searchInput.removeEventListener('input', onInput);
    };
  }, [navigate]);

  useEffect(() => {
    if (location.pathname !== '/search' && searchInputRef.current) {
      searchInputRef.current.value = '';
    }
  }, [location.pathname]);

  return (
    <header
      className={`${
        isHeaderFloat ? 'bg-black' : 'bg-transparent'
      } transition-all duration-500 fixed top-0 left-0 right-0 z-10`}
    >
      <div className="container mx-auto px-5 h-20 flex justify-between items-center">
        <Link to="/" className=" flex gap-3 items-center">
          <Logo className="w-9 h-9 cursor-pointer hover:rotate-12 transition-all" />
          <div className=" text-2xl font-bold text-green-400">Movieck</div>
        </Link>
        <Input ref={searchInputRef} />
      </div>
    </header>
  );
}
