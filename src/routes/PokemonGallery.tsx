import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSearchQuery from '../hooks/useSearchQuery';
import SearchBar from '../components/SearchBar';
import { Pokemon, TypeInfo } from '../types/type';
import { getPokemonsList } from '../services/api';
import Pagination from '../components/Pagination';
import CardsList from '../components/CardsList';
import { ITEMS_PER_PAGE } from '../utils/constants';

const PokemonGallery: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery', '');

  const { pageId } = useParams<{ pageId: string }>();
  const currentPage = Number(pageId) || 1;

  const navigate = useNavigate();

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

  const fetchAllPokemonsData = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const pokemonsData = await getPokemonsList(offset, ITEMS_PER_PAGE);
      const detailedPokemons = await fetchPokemonDetails(pokemonsData.results);
      setPokemons(detailedPokemons);
      setTotalPages(Math.ceil(pokemonsData.count / ITEMS_PER_PAGE));
    } catch (error) {
      setError('Failed to fetch Pokémon data!');
    } finally {
      setIsLoading(false);
    }
  }, []);

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
        const allPokemons = await getPokemonsList(0, 1000);
        const filteredPokemons = allPokemons.results.filter((pokemon) =>
          pokemon.name.toLowerCase().startsWith(trimmedQuery.toLowerCase())
        );
        if (filteredPokemons.length > 0) {
          const detailedPokemons = await fetchPokemonDetails(filteredPokemons);
          setPokemons(detailedPokemons);
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
          {pokemons.length && (
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
