import { Pokemon } from '../types/type';
import Card from '../components/Card';

interface CardsListProps {
  pokemons: Pokemon[];
}

const CardsList: React.FC<CardsListProps> = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-16">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
};

export default CardsList;
