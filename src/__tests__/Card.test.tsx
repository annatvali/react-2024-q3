import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Card from '../components/Card';

vi.mock('../services/api', () => ({
  getPokemonDetails: vi.fn(),
}));

describe('Card Component', () => {
  const mockData = {
    id: 1,
    name: 'Bulbasaur',
    image: 'http://example.com/bulbasaur.png',
    type: 'Grass',
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetAllMocks();

    vi.mock('react-router-dom', async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...(actual as object),
        useNavigate: vi.fn(),
      };
    });

    render(
      <BrowserRouter>
        <Card {...mockData} />
      </BrowserRouter>
    );
  });

  it('renders the relevant card data', () => {
    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(`Type: ${mockData.type}`)).toBeInTheDocument();
    expect((screen.getByAltText(mockData.name) as HTMLImageElement).src).toBe(
      mockData.image
    );
  });
});
