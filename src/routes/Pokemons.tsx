import { useState, useEffect, useCallback } from 'react';
import useSearchQuery from '../hooks/useSearchQuery';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import { Pokemon, TypeInfo } from '../types/type';
import { getPokemonsList, getPokemon } from '../services/api';
import Pagination from '../components/Pagination';

const Pokemons: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useSearchQuery('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 20;

  const fetchAllPokemonsData = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const pokemonsData = await getPokemonsList(offset, ITEMS_PER_PAGE);
      const detailedPokemons = await fetchPokemonDetails(pokemonsData.results);
      setPokemons(detailedPokemons);
      setTotalPages(Math.ceil(pokemonsData.count / ITEMS_PER_PAGE));
      setNextUrl(pokemonsData.next);
      setPreviousUrl(pokemonsData.previous);
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
        fetchAllPokemonsData(currentPage);
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
    [fetchAllPokemonsData, setSearchQuery, currentPage]
  );

  const handleError = (error: unknown) => {
    setError(error instanceof Error ? error.message : String(error));
    setLoading(false);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let page = parseInt(urlParams.get('page') || '1', 10);
    const searchQuery =
      urlParams.get('search') || localStorage.getItem('searchQuery') || '';

    if (!urlParams.has('page') || isNaN(page) || page < 1) {
      page = 1;
      urlParams.set('page', '1');
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}?${urlParams.toString()}`
      );
    }
    setCurrentPage(page);
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      handleSearch(trimmedQuery);
    } else {
      fetchAllPokemonsData(page);
    }
  }, [fetchAllPokemonsData, handleSearch]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [handleSearch, searchQuery]);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page', page.toString());
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${urlParams.toString()}`
    );
    fetchAllPokemonsData(page);
  };

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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        nextUrl={nextUrl}
        previousUrl={previousUrl}
      />
    </div>
  );
};

export default Pokemons;