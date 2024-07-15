import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import Button from './ui/Button';

type Props = {
  onSearch: (query: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [hasError, setState] = useState(false);

  useEffect(() => {
    const storedQuery = localStorage.getItem('searchQuery');
    if (storedQuery) {
      setQuery(storedQuery);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      const searchParams = new URLSearchParams(window.location.search);
      const hasSearchParams = searchParams.has('search');

      if (hasSearchParams) {
        window.history.pushState({}, '', window.location.pathname);
        onSearch('');
      }
    } else {
      localStorage.setItem('searchQuery', trimmedQuery);
      onSearch(trimmedQuery);
    }
  };

  const handleErrorBtnClick = (): void => {
    setState(true);
    throw new Error('Intentional error');
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full flex-wrap sm:flex items-center space-x-2"
      >
        <input
          type="text"
          value={query}
          onChange={handleChange}
          className="border-2 p-2 flex-grow rounded-md"
          placeholder="Search Pokémon..."
        />
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 mt-2 sm:mt-0"
        >
          Search
        </Button>
        <Button
          type="button"
          onClick={handleErrorBtnClick}
          className="w-32 bg-red-500 hover:bg-red-700 mt-2 sm:mt-0"
        >
          Throw Error
        </Button>
      </form>
      {hasError && (
        <div className="text-red-500 mt-2">
          An error has occurred. Please try again.
        </div>
      )}
    </div>
  );
};

export default SearchBar;
