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

  useEffect(() => {
    const isDetailsPage = location.pathname.includes('/details/');
    dispatch(setIsPokemonDetailsOpen(isDetailsPage));
  }, [router.asPath, dispatch]);

  useEffect(() => {
    if (router.pathname === '/' || router.pathname === '/page/1') {
      dispatch(setSearchQuery(''));
      dispatch(setCurrentPage(1));
    }
  }, [router.pathname, dispatch]);

  useEffect(() => {
    if (pageId) {
      dispatch(setCurrentPage(Number(pageId)));
    }
  }, [pageId, dispatch]);

  const handleCardClick = (detailsId: number) => {
    router.push(`/page/${currentPage}/details/${detailsId}`);
  };

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery) {
      dispatch(setSearchQuery(''));
      router.push(`/page/1`);
    } else {
      dispatch(setSearchQuery(searchQuery));
      router.push(`/page/1?search=${searchQuery}`);
    }
    dispatch(setCurrentPage(1));
  };

  const pokemons = searchQuery
    ? searchPokemonData?.results
    : allPokemonsData?.results;

  if (allPokemonsLoading || searchPokemonLoading) return <div>Loading...</div>;
  if (allPokemonsError || searchPokemonError)
    return <div>Error loading pokemons</div>;

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {pokemons && pokemons.length > 0 ? (
        <>
          <CardList pokemons={pokemons} onCardClick={handleCardClick} />
          {!searchQuery && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(newPage) => dispatch(setCurrentPage(newPage))}
            />
          )}
        </>
      ) : (
        <div>No Pokémon found!</div>
      )}
    </div>
  );
};

export default PokemonGallery;
