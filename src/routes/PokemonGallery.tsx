import { useState, useEffect, useCallback } from 'react';
import useSearchQuery from '../hooks/useSearchQuery';
import SearchBar from '../components/SearchBar';
import { Pokemon, TypeInfo } from '../types/type';
import { getPokemonsList, getPokemon } from '../services/api';
import Pagination from '../components/Pagination';
import CardsList from '../components/CardsList';

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
          setError(null);
        } else {
          setLoading(false);
          setPokemons([]);
        }
      } catch (error) {
        setLoading(false);
        setError('Failed to fetch Pokémon data. Please try again.');
      }
    },
    [fetchAllPokemonsData, setSearchQuery, currentPage]
  );

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

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <main className="mx-2">
      <div className="flex justify-center items-center mt-16">
        <SearchBar onSearch={(query) => handleSearch(query)} />
      </div>
      {loading && <p>Loading...</p>}
      <CardsList pokemons={pokemons} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        nextUrl={nextUrl}
        previousUrl={previousUrl}
      />
    </main>
  );
};

export default Pokemons;
