import { Outlet } from 'react-router';
import PokemonGallery from '../components/PokemonGallery';

const Home = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      <div className="col-span-1 sm:col-span-3">
        <PokemonGallery />
      </div>
      <div className="col-span-1 sm:col-span-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
