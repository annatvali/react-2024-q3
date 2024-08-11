import { useEffect } from 'react';
import {
  useGetPokemonsQuery,
  useSearchPokemonQuery,
} from '../services/apiService';
import CardList from './CardList';
import Pagination from './Pagination';
import { ITEMS_PER_PAGE } from '../utils/constants';
import { useRouter } from 'next/router';
import {
  setIsPokemonDetailsOpen,
  setSearchQuery,
  setCurrentPage,
} from '../features/PokemonSlice';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from './SearchForm';
import { AppState } from '../app/store';

const PokemonGallery: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { pageId } = router.query;
  const searchQuery = useSelector(
    (state: AppState) => state.pokemon.searchQuery
  );
  const currentPage = useSelector(
    (state: AppState) => state.pokemon.currentPage
  );
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const {
    data: allPokemonsData,
    error: allPokemonsError,
    isLoading: allPokemonsLoading,
  } = useGetPokemonsQuery({ page: currentPage, offset });

  const {
    data: searchPokemonData,
    error: searchPokemonError,
    isLoading: searchPokemonLoading,
  } = useSearchPokemonQuery(searchQuery, { skip: !searchQuery });

  const totalPages = Math.ceil((allPokemonsData?.count ?? 0) / ITEMS_PER_PAGE);

  // Check if we are on a details page
  useEffect(() => {
    const isDetailsPage = location.pathname.includes('/details/');
    dispatch(setIsPokemonDetailsOpen(isDetailsPage));
  }, [router.asPath, dispatch]);

  // Reset search query and pagination when navigating to the home page
  useEffect(() => {
    if (router.pathname === '/' || router.pathname === '/page/1') {
      dispatch(setSearchQuery(''));
      dispatch(setCurrentPage(1));
    }
  }, [router.pathname, dispatch]);

  // Update the current page based on the query parameter
  useEffect(() => {
    if (pageId) {
      dispatch(setCurrentPage(Number(pageId)));
    }
  }, [pageId, dispatch]);

  // Handle card click to navigate to the details page
  const handleCardClick = (detailsId: number) => {
    router.push(`/page/${currentPage}/details/${detailsId}`);
  };

  // Handle search query changes
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery) {
      // Reset to show all Pokémon if the search query is empty
      dispatch(setSearchQuery(''));
      router.push(`/page/1`);
    } else {
      dispatch(setSearchQuery(searchQuery));
      router.push(`/page/1?search=${searchQuery}`);
    }
    dispatch(setCurrentPage(1));
  };

  // Determine which Pokémon data to display
  const pokemons = searchQuery
    ? searchPokemonData?.results
    : allPokemonsData?.results;

  // Handle loading and error states
  if (allPokemonsLoading || searchPokemonLoading) return <div>Loading...</div>;
  if (allPokemonsError || searchPokemonError)
    return <div>Error loading pokemons</div>;

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {pokemons && (
        <CardList pokemons={pokemons} onCardClick={handleCardClick} />
      )}
      {!searchQuery && pokemons && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => dispatch(setCurrentPage(newPage))}
        />
      )}
    </div>
  );
};

export default PokemonGallery;
