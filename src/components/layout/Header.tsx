import Link from 'next/link';
import Logo from '../ui/Logo';
import { useDispatch } from 'react-redux';
import { setSearchQuery, setCurrentPage } from '../../features/PokemonSlice';

const Header = () => {
  const dispatch = useDispatch();

  const handleHomeClick = () => {
    dispatch(setSearchQuery(''));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="h-24 bg-gray-700 text-white flex justify-between items-center py-2 px-4">
      <Logo />
      <div className="flex text-xl items-center font-bold gap-6">
        <Link
          href="/"
          className="hover:text-amber-300 hover:underline"
          onClick={handleHomeClick}
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Header;
