import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import useSearchQuery from '../hooks/useSearchQuery';
import SearchBar from '../components/SearchBar';
import { Pokemon } from '../types/type';
import { getPokemonsList, getPokemon } from '../services/api';
import Pagination from '../components/Pagination';
import CardsList from '../components/CardsList';
import { ITEMS_PER_PAGE } from '../utils/constants';

const PokemonGallery: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showPagination, setShowPagination] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery', '');

  const { pageId } = useParams<{ pageId: string }>();
  const currentPage = Number(pageId) || 1;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchAllPokemonsData = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const pokemonsData = await getPokemonsList(offset, ITEMS_PER_PAGE);
      const detailedPokemons = await Promise.all(
        pokemonsData.results.map((pokemon) => getPokemon(pokemon.name))
      );
      setPokemons(detailedPokemons.filter(Boolean) as Pokemon[]);
      setTotalPages(Math.ceil(pokemonsData.count / ITEMS_PER_PAGE));
      setShowPagination(true);
    } catch {
      setError('Failed to fetch Pokémon data!');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    async (query: string) => {
      setIsLoading(true);
      setSearchQuery(query);
      if (query.trim() === '') {
        fetchAllPokemonsData(currentPage);
        setSearchParams(new URLSearchParams());
        return;
      } else {
        setSearchParams({ search: query });
      }

      try {
        const allPokemons = await getPokemonsList(0, 1000);
        const filteredPokemons = allPokemons.results.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(query.toLowerCase())
        );
        const detailedPokemons = await Promise.all(
          filteredPokemons.map((pokemon) => getPokemon(pokemon.name))
        );
        setPokemons(detailedPokemons.filter(Boolean) as Pokemon[]);
        setShowPagination(false);
      } catch {
        setError('Failed to fetch Pokémon data!');
      } finally {
        setIsLoading(false);
      }
    },
    [fetchAllPokemonsData, setSearchQuery, setSearchParams, currentPage]
  );

  useEffect(() => {
    const initialSearchQuery = searchParams.get('search') || searchQuery;
    if (initialSearchQuery) {
      handleSearch(initialSearchQuery);
    } else {
      fetchAllPokemonsData(currentPage);
    }
  }, [
    fetchAllPokemonsData,
    handleSearch,
    currentPage,
    searchQuery,
    searchParams,
  ]);

  const handlePageChange = (pageId: number) => {
    navigate(`/page/${pageId}`);
  };

  const handleCardClick = (detailsId: number) => {
    navigate(`/page/${currentPage}/details/${detailsId}`);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <main className="mx-2">
      <div className="flex justify-center items-center mt-16">
        <SearchBar onSearch={handleSearch} />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : pokemons.length === 0 ? (
        <p className="text-red-500">No Pokémon found.</p>
      ) : (
        <>
          <CardsList
            pokemons={pokemons}
            currentPage={currentPage}
            onCardClick={handleCardClick}
          />
          {showPagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </main>
  );
};

export default PokemonGallery;
