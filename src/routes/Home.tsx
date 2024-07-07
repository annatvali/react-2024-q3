import { Component } from 'react';
import SearchBar from '../components/SearchBar';
import ErrorBoundary from '../components/errors/ErrorBoundary';
import ErrorButton from '../components/errors/ErrorButton';
import PokemonCard from '../components/PokemonCard';
import { Pokemon, TypeInfo } from '../types/type';
import PokemonAPI from '../services/api';

type Props = unknown;
type State = {
  pokemons: Pokemon[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
};

export default class HomePage extends Component<Props, State> {
  state = {
    pokemons: [],
    searchQuery: '',
    loading: false,
    error: null,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.fetchAllPokemons();
    const savedQuery = localStorage.getItem('searchQuery') || '';
    if (savedQuery) {
      this.setState({ searchQuery: savedQuery });
    }
  }

  componentDidUpdate(_prevProps: Record<string, never>, prevState: State) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.handleSearch(this.state.searchQuery);
    }
  }

  fetchAllPokemons = async () => {
    try {
      const pokemons = await PokemonAPI.fetchAllPokemons();
      const detailedPokemons = await this.fetchPokemonDetails(pokemons.results);
      this.setState({ pokemons: detailedPokemons, loading: false });
    } catch (error) {
      this.handleError(error);
    }
  };

  fetchPokemonDetails = async (pokemons: { url: string }[]) => {
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

  handleSearch = async (query: string) => {
    this.setState({ loading: true, error: null, searchQuery: query });
    localStorage.setItem('searchQuery', query);
    try {
      const pokemon = await PokemonAPI.searchPokemon(query);
      if (pokemon) {
        this.setState({ pokemons: [pokemon], loading: false });
      } else {
        this.setState({
          error: 'Pokémon not found',
          loading: false,
          pokemons: [],
        });
      }
    } catch (error) {
      this.handleError('Failed to search Pokémon!');
    }
  };

  handleError = (error: unknown) => {
    this.setState({
      error: error instanceof Error ? error.message : String(error),
      loading: false,
    });
  };

  render() {
    const { pokemons, loading, error } = this.state;

    return (
      <ErrorBoundary>
        <div className="mx-2">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16">
            <SearchBar onSearch={(query) => this.handleSearch(query)} />
            <ErrorButton />
          </div>
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 my-16">
            {pokemons.map((pokemon: Pokemon) => (
              <PokemonCard key={pokemon.id} {...pokemon} />
            ))}
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
