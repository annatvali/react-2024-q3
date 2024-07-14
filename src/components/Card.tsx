import { memo } from 'react';
import { Pokemon } from '../types/type';
import generateGradient from '../utils/gradientGenerator';
import { useNavigate } from 'react-router';

interface PokemonCardProps extends Pokemon {}

const Card: React.FC<PokemonCardProps> = memo(({ id, name, image, type }) => {
  const navigate = useNavigate();
  const gradientClass = generateGradient(id);

  const handleClick = (): void => {
    navigate(`/pokemon/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative my-4 cursor-pointer overflow-hidden rounded-lg shadow-md transition duration-150 ease-in-out ${gradientClass}`}
    >
      <div className="relative h-40 overflow-hidden rounded-md">
        <div className="absolute top-0 right-0 bg-amber-300 py-2 px-4 rounded-md z-10">
          <p className="text-gray-700 font-bold">{id}</p>
        </div>
        <img
          className="h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-110"
          src={image}
          alt={name}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-700">Type: {type}</p>
      </div>
    </div>
  );
});

export default Card;
