import { Pokemon } from '../types/type';
import Card from '../components/Card';

interface CardsListProps {
  pokemons: Pokemon[];
  currentPage: number;
  onCardClick: (id: number) => void;
}

const CardsList: React.FC<CardsListProps> = ({
  pokemons,
  currentPage,
  onCardClick,
}) => {
  if (pokemons.length === 0) {
    return <p className="text-red-500">No Pokémon found.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-16">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          currentPage={currentPage}
          onClick={onCardClick}
          {...pokemon}
        />
      ))}
    </div>
  );
};

export default CardsList;
