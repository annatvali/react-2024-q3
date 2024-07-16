import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, Mock } from 'vitest';
import { getPokemonDetails } from '../services/api';
import PokemonDetails from '../routes/PokemonDetails';

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  image: 'https://example.com/bulbasaur.png',
  baseExperience: 64,
  height: 7,
  weight: 69,
  types: ['grass', 'poison'],
};

vi.mock('../services/api', () => ({
  getPokemonDetails: vi.fn(),
}));

describe('PokemonDetails component', () => {
  beforeEach(() => {
    (getPokemonDetails as Mock).mockResolvedValue(mockPokemon);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders loading indicator while fetching data', () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/1']}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders Pokemon details correctly after data fetch', async () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/1']}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByAltText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('ID : 1')).toBeInTheDocument();
      expect(screen.getByText('Base Experience : 64')).toBeInTheDocument();
      expect(screen.getByText('Height : 7')).toBeInTheDocument();
      expect(screen.getByText('Weight : 69')).toBeInTheDocument();
      expect(screen.getByText('Types : grass, poison')).toBeInTheDocument();
    });
  });

  it('hides the component when close button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/pokemon/1']}>
        <Routes>
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('x'));

    await waitFor(() => {
      expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    });
  });
});
