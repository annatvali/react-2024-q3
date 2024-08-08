import { useState, useEffect } from 'react';
import {
  useGetPokemonsQuery,
  useSearchPokemonQuery,
} from '../services/apiService';
import CardList from './CardList';
import Pagination from './Pagination';
import { ITEMS_PER_PAGE } from '../utils/constants';
import { useNavigate, useParams, useLocation } from 'react-router';
import {
  setIsPokemonDetailsOpen,
  setSearchQuery,
} from '../features/PokemonSlice';
import { useDispatch, useSelector } from 'react-redux';
import SearchForm from './SearchForm';
import { AppState } from '../app/store';

const PokemonGallery: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const searchQuery = useSelector(
    (state: AppState) => state.pokemon.searchQuery
  );
  const offset = (page - 1) * ITEMS_PER_PAGE;

  const {
    data: allPokemonsData,
    error: allPokemonsError,
    isLoading: allPokemonsLoading,
  } = useGetPokemonsQuery({ page, offset });
  const {
    data: searchPokemonData,
    error: searchPokemonError,
    isLoading: searchPokemonLoading,
  } = useSearchPokemonQuery(searchQuery, { skip: !searchQuery });

  const { pageId } = useParams<{ pageId: string }>();
  const currentPage = Number(pageId) || 1;
  const totalPages = Math.ceil((allPokemonsData?.count ?? 0) / ITEMS_PER_PAGE);

  useEffect(() => {
    const isDetailsPage = location.pathname.includes('/details/');
    dispatch(setIsPokemonDetailsOpen(isDetailsPage));
  }, [location, dispatch]);

  if (allPokemonsLoading || searchPokemonLoading) return <div>Loading...</div>;
  if (allPokemonsError || searchPokemonError)
    return <div>Error loading pokemons</div>;

  const handleCardClick = (detailsId: number) => {
    navigate(`/page/${currentPage}/details/${detailsId}`);
  };

  const handleSearch = (searchQuery: string) => {
    navigate(`/page/1?search=${searchQuery}`);
    dispatch(setSearchQuery(searchQuery));
    setPage(1);
  };

  const pokemons = searchQuery ? searchPokemonData : allPokemonsData;

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {pokemons && (
        <CardList pokemons={pokemons} onCardClick={handleCardClick} />
      )}
      {!searchQuery && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default PokemonGallery;
