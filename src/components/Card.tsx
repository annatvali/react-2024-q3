import { memo } from 'react';
import generateGradient from '../utils/gradientGenerator';
import { useAppDispatch, useAppSelector } from '../app/store';
import { selectItem, unselectItem } from '../features/SelectedItemsSlice';
import { Pokemon } from '../types/types';
import Image from 'next/image';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (id: number) => void;
}

const Card: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const gradientClass = generateGradient(pokemon.id);
  const spriteUrl = pokemon.sprites?.front_default;

  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(
    (state) => state.selectedItems.selectedItems
  );
  const isSelected = selectedItems.includes(pokemon.name);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (isSelected) {
      dispatch(unselectItem(pokemon.name));
    } else {
      dispatch(selectItem(pokemon.name));
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    onClick(pokemon.id);
  };

  return (
    <div
      test-id={`card-${pokemon.id}`}
      onClick={handleClick}
      className={`group relative my-4 cursor-pointer overflow-hidden pl-2 rounded-lg shadow-md transition duration-150 ease-in-out ${gradientClass}`}
    >
      <div className="relative h-40 overflow-hidden rounded-md">
        <div className="absolute top-0 right-0 bg-amber-300 py-2 px-4 rounded-md z-10">
          <p className="text-gray-700 font-bold">{pokemon.id}</p>
        </div>
        <Image
          width={200}
          height={200}
          className="h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-110"
          src={spriteUrl}
          alt={pokemon.name}
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          {pokemon.name}
        </h3>
      </div>
      <div className="flex items-center gap-2 p-2">
        <label className="font-semibold" htmlFor="inputSelect">
          Select card:{' '}
        </label>
        <input
          name="inputSelect"
          className="cursor-pointer w-4 h-4"
          type="checkbox"
          checked={isSelected}
          onChange={(event) => handleCheckboxChange(event)}
          onClick={(event) => event.stopPropagation()}
        />
      </div>
    </div>
  );
};

const MemoizedCard = memo(Card);

export default MemoizedCard;
