import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Card from '../components/Card';
import generateGradient from '../utils/gradientGenerator';

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

vi.mock('../utils/gradientGenerator', () => ({
  default: vi.fn(() => 'bg-gradient-to-r from-green-400 to-blue-500'),
}));

describe('Card Component', () => {
  const mockData = {
    id: 1,
    name: 'bulbasaur',
    image: 'http://example.com/bulbasaur.png',
    type: 'grass',
    currentPage: 1,
    onClick: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.resetAllMocks();
    render(
      <BrowserRouter>
        <Card {...mockData} onClick={mockData.onClick} />
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
    expect(generateGradient).toHaveBeenCalledWith(mockData.id);
  });

  // it('opens detailed card component on click', async () => {
  //   const cardElement = screen
  //     .getByText(mockData.name.toLowerCase())
  //     .closest('div');
  //   if (cardElement) {
  //     fireEvent.click(cardElement);
  //     console.log('Clicked element:', cardElement);
  //     console.log(mockNavigate.mock.calls);
  //     expect(await mockNavigate).toHaveBeenCalledWith(
  //       `/details/${mockData.id}`
  //     );
  //   } else {
  //     console.error('Card element not found');
  //   }
  // });

  // it('triggers an additional API call to fetch detailed information on click', async () => {
  //   const cardElement = screen
  //     .getByText(mockData.name.toLowerCase())
  //     .closest('div');
  //   if (cardElement) {
  //     fireEvent.click(cardElement);
  //     expect(await mockNavigate).toHaveBeenCalledWith(
  //       `/details/${mockData.id}`
  //     );
  //   } else {
  //     console.error('Card element not found');
  //   }
  // });
});
