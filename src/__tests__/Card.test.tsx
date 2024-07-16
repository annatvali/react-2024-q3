import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Card from '../components/Card';

vi.mock('../services/api', () => ({
  getPokemonDetails: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock('react-router', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: () => mockNavigate,
  };
});

describe('Card Component', () => {
  const mockData = {
    id: 1,
    name: 'bulbasaur',
    image: 'http://example.com/bulbasaur.png',
    type: 'grass',
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetAllMocks();
    render(
      <BrowserRouter>
        <Card {...mockData} />
      </BrowserRouter>
    );
  });

  it('renders the relevant card data', async () => {
    expect(await screen.getByText(mockData.name)).toBeInTheDocument();
    expect(
      await screen.getByText(`Type: ${mockData.type}`)
    ).toBeInTheDocument();
    expect(
      ((await screen.getByAltText(mockData.name)) as HTMLImageElement).src
    ).toBe(mockData.image);
  });

  it('opens detailed card component on click', async () => {
    const cardElement = screen
      .getByText(mockData.name.toLowerCase())
      .closest('div');
    if (cardElement) {
      fireEvent.click(cardElement);
      console.log('Clicked element:', cardElement); // Add this line
      console.log(mockNavigate.mock.calls);
      expect(await mockNavigate).toHaveBeenCalledWith(
        `/pokemon/${mockData.id}`
      );
    } else {
      console.error('Card element not found'); // Add this line
    }
  });

  it('triggers an additional API call to fetch detailed information on click', async () => {
    const cardElement = screen
      .getByText(mockData.name.toLowerCase())
      .closest('div');
    if (cardElement) {
      fireEvent.click(cardElement);
      expect(await mockNavigate).toHaveBeenCalledWith(
        `/pokemon/${mockData.id}`
      );
    } else {
      console.error('Card element not found');
    }
  });
});
