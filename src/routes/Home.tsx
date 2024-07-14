import { Outlet } from 'react-router';
import Pokemons from './Pokemons';
import { OutsideClickProvider } from '../hooks/OutsideClickProvider';

const Home = () => {
  return (
    <OutsideClickProvider>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <Pokemons />
        </div>
        <div className="col-span-1">
          <Outlet />
        </div>
      </div>
    </OutsideClickProvider>
  );
};

export default Home;
