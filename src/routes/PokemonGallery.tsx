import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSearchQuery from '../hooks/useSearchQuery';
import SearchBar from '../components/SearchBar';
import { Pokemon, TypeInfo } from '../types/type';
import { getPokemonsList, getPokemon } from '../services/api';
import Pagination from '../components/Pagination';
import CardsList from '../components/CardsList';

const PokemonGallery: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useSearchQuery('searchQuery', '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { pageId } = useParams<{ pageId: string }>();
  const [currentPage, setCurrentPage] = useState<number>(Number(pageId) || 1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);

  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 20;

  const fetchAllPokemonsData = useCallback(async (page: number) => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const pokemonsData = await getPokemonsList(offset, ITEMS_PER_PAGE);
      const detailedPokemons = await fetchPokemonDetails(pokemonsData.results);
      setPokemons(detailedPokemons);
      setTotalPages(Math.ceil(pokemonsData.count / ITEMS_PER_PAGE));
      setNextUrl(pokemonsData.next);
      setPreviousUrl(pokemonsData.previous);
      setIsLoading(false);
    } catch (error) {
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
          setIsLoading(false);
          setError(null);
        } else {
          setIsLoading(false);
          setPokemons([]);
        }
      } catch (error) {
        setIsLoading(false);
        setError('Failed to fetch Pokémon data. Please try again.');
      }
    },
    [fetchAllPokemonsData, setSearchQuery, currentPage]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery =
      urlParams.get('search') || localStorage.getItem('searchQuery') || '';

    setCurrentPage(Number(pageId) || 1);
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      handleSearch(trimmedQuery);
    } else {
      fetchAllPokemonsData(Number(pageId) || 1);
    }
  }, [fetchAllPokemonsData, handleSearch, pageId]);

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
      {isLoading && <p>Loading...</p>}
      <CardsList
        pokemons={pokemons}
        currentPage={currentPage}
        onCardClick={handleCardClick}
      />
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

export default PokemonGallery;
