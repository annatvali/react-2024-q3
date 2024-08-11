import { Pokemon } from '../types/types';
import MemoizedCard from './Card';

interface CardListProps {
  pokemons: Pokemon[];
  onCardClick: (id: number) => void;
}

const CardList: React.FC<CardListProps> = ({ pokemons, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-16">
      {pokemons.map((pokemon) => (
        <MemoizedCard
          key={pokemon.id}
          pokemon={pokemon}
          onClick={() => onCardClick(pokemon.id)}
        />
      ))}
    </div>
  );
};

export default CardList;
