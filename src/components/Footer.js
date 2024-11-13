import { Link } from 'react-router-dom';
import { ReactComponent as Tg } from '../assets/tg.svg';
import { ReactComponent as Github } from '../assets/github.svg';
import { ReactComponent as In } from '../assets/in.svg';

export function Footer() {
  return (
    <footer className=" pt-24 pb-5 mt-auto">
      <div className=" flex gap-5 justify-center items-center mb-4">
        <Link
          to={'https://t.me/meeeeeeerik'}
          target="_blank"
          className="hover:rotate-12 transition-all"
        >
          <Tg />
        </Link>
        <Link
          to={'https://github.com/meeeeeeerik'}
          target="_blank"
          className="hover:rotate-12 transition-all"
        >
          <Github />
        </Link>
        <Link to={'#'} className="hover:rotate-12 transition-all">
          <In />
        </Link>
      </div>
      <div className=" text-center text-sm text-green-300">Made by Merdan</div>
    </footer>
  );
}
