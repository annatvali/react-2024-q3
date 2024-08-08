import { Pokemon } from '../types/types';
import Card from './Card';

interface CardListProps {
  pokemons: {
    count: number;
    results: Pokemon[];
  };
  onCardClick: (id: number) => void;
}

const CardList: React.FC<CardListProps> = ({ pokemons, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-16">
      {pokemons.results.map((pokemon) => (
        <Card key={pokemon.name} {...pokemon} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default CardList;
