import { useState, useEffect, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import { Pokemon, TypeInfo } from '../types/type';
import { getPokemonsList, getPokemon } from '../services/api';

const HomePage: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllPokemonsData = useCallback(async () => {
    setLoading(true);
    try {
      const pokemonsData = await getPokemonsList();
      const detailedPokemons = await fetchPokemonDetails(pokemonsData.results);
      setPokemons(detailedPokemons);
      setLoading(false);
    } catch (error) {
      setError('Failed to load Pokémon');
      setLoading(false);
    }
  }, []);

  const fetchPokemonDetails = async (pokemons: { url: string }[]) => {
    return Promise.all(
      pokemons.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const details = await response.json();
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.front_default,
          type: details.types
            .map((typeInfo: TypeInfo) => typeInfo.type.name)
            .join(', '),
        };
      })
    );
  };

  const handleSearch = useCallback(
    async (query: string) => {
      const trimmedQuery = query.trim();
      setLoading(true);
      setError(null);
      setSearchQuery(trimmedQuery);
      localStorage.setItem('searchQuery', trimmedQuery);

      if (trimmedQuery === '') {
        window.history.pushState({}, '', window.location.pathname);
        fetchAllPokemonsData();
        return;
      } else {
        window.history.pushState(
          { search: trimmedQuery },
          '',
          `?search=${trimmedQuery}`
        );
      }

      try {
        const pokemon = await getPokemon(trimmedQuery);
        if (pokemon) {
          setPokemons([pokemon]);
          setLoading(false);
        } else {
          setError('Pokémon not found');
          setLoading(false);
          setPokemons([]);
        }
      } catch (error) {
        handleError('Failed to search Pokémon!');
      }
    },
    [fetchAllPokemonsData]
  );

  const handleError = (error: unknown) => {
    setError(error instanceof Error ? error.message : String(error));
    setLoading(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery =
      urlParams.get('search') || localStorage.getItem('searchQuery') || '';
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      handleSearch(trimmedQuery);
    } else {
      fetchAllPokemonsData();
    }
  }, [fetchAllPokemonsData, handleSearch]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [handleSearch, searchQuery]);

  return (
    <div className="mx-2">
      <div className="flex justify-center items-center mt-16">
        <SearchBar onSearch={(query) => handleSearch(query)} />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 my-16">
        {pokemons.map((pokemon: Pokemon) => (
          <PokemonCard key={pokemon.id} {...pokemon} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
