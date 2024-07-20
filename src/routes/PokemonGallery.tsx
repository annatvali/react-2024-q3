import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSearchQuery from '../hooks/useSearchQuery';
import SearchBar from '../components/SearchBar';
import { Pokemon, TypeInfo } from '../types/type';
import { getPokemonsList, getPokemon } from '../services/api';
import Pagination from '../components/Pagination';
import CardsList from '../components/CardsList';
import { ITEMS_PER_PAGE } from '../utils/constants';

const PokemonGallery: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery', '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { pageId } = useParams<{ pageId: string }>();
  const currentPage = Number(pageId) || 1;
  const [totalPages, setTotalPages] = useState<number>(1);

  const navigate = useNavigate();

  const fetchAllPokemonsData = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const pokemonsData = await getPokemonsList(offset, ITEMS_PER_PAGE);
      const detailedPokemons = await fetchPokemonDetails(pokemonsData.results);
      setPokemons(detailedPokemons);
      setTotalPages(Math.ceil(pokemonsData.count / ITEMS_PER_PAGE));
    } catch (error) {
      console.error('Failed to fetch Pokémon data!', error);
    } finally {
      setIsLoading(false);
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
      setIsLoading(true);
      setSearchQuery(trimmedQuery);

      if (trimmedQuery === '') {
        fetchAllPokemonsData(currentPage);
        window.history.pushState({}, '', window.location.pathname);
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
          setError(null);
        } else {
          setPokemons([]);
        }
      } catch (error) {
        setError('Failed to fetch Pokémon data!');
      } finally {
        setIsLoading(false);
      }
    },
    [fetchAllPokemonsData, setSearchQuery, currentPage]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const initialSearchQuery = urlParams.get('search') || searchQuery;

    const trimmedQuery = initialSearchQuery.trim();
    if (trimmedQuery) {
      handleSearch(trimmedQuery);
    } else {
      fetchAllPokemonsData(currentPage);
    }
  }, [fetchAllPokemonsData, handleSearch, currentPage, searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [handleSearch, searchQuery]);

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
        <SearchBar onSearch={(query) => handleSearch(query)} />
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <CardsList
            pokemons={pokemons}
            currentPage={currentPage}
            onCardClick={handleCardClick}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </main>
  );
};

export default PokemonGallery;
