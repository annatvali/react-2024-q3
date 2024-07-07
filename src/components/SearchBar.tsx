import { ChangeEvent, FormEvent, Component } from 'react';
import Button from './ui/Button';

type Props = {
  onSearch: (query: string) => void;
};

type State = {
  query: string;
};

export default class SearchBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { query: '' };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
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
      </form>
    );
  }
}
