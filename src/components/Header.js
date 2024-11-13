import { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { Input } from './input';
import { debounce } from '../utils';
import { Link } from 'react-router-dom';

export function Header() {
  const [isHeaderFloat, setIsHeaderFloat] = useState(false);

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
        <Input />
      </div>
    </header>
  );
}
