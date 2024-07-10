import { ChangeEvent, FormEvent, Component } from 'react';
import Button from './ui/Button';

type Props = {
  onSearch: (query: string) => void;
};

type State = {
  query: string;
  hasError: boolean;
};

export default class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { query: '', hasError: false };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const trimmedQuery = this.state.query.trim();
    // this.props.onSearch(trimmedQuery);

    if (trimmedQuery === '') {
      // Check if the URL already has search parameters
      const searchParams = new URLSearchParams(window.location.search);
      const hasSearchParams = searchParams.has('search');

      if (hasSearchParams) {
        // If URL has search parameters, clear them and display all pokemons
        window.history.pushState({}, '', window.location.pathname);
        this.props.onSearch(''); // Assuming onSearch with empty string fetches all pokemons
      }
      // If there are no search parameters, do nothing
    } else {
      // If there is a query, proceed with the search
      this.props.onSearch(trimmedQuery);
    }
  };

  handleErrorBtnClick = (): void => {
    this.setState({ hasError: true });
    throw new Error('Intentional error');
  };

  render() {
    return (
      <div className="w-full">
        <form
          onSubmit={this.handleSubmit}
          className="w-full flex items-center space-x-2"
        >
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleChange}
            className="border-2 p-2 flex-grow rounded-md"
            placeholder="Search Pokémon..."
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-700">
            Search
          </Button>
          <Button
            type="button"
            onClick={this.handleErrorBtnClick}
            className="w-32 bg-red-500 hover:bg-red-700"
          >
            Throw Error
          </Button>
        </form>
        {this.state.hasError && (
          <div className="text-red-500 mt-2">
            An error has occurred. Please try again.
          </div>
        )}
      </div>
    );
  }
}
