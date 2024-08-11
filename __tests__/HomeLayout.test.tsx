import React from 'react';
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';
import HomeLayout from '../src/components/HomeLayout';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('../src/components/PokemonGallery', () => () => (
  <div>PokemonGallery</div>
));
jest.mock(
  '../src/components/PokemonDetails',
  () =>
    ({ detailsId }: { detailsId: number }) => (
      <div>PokemonDetails {detailsId}</div>
    )
);

describe('HomeLayout', () => {
  it('renders PokemonGallery', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

    const { getByText } = render(<HomeLayout />);
    expect(getByText('PokemonGallery')).toBeInTheDocument();
  });

  it('renders PokemonDetails when detailsId is a valid number', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { detailsId: '123' },
    });

    const { getByText } = render(<HomeLayout />);
    expect(getByText('PokemonDetails 123')).toBeInTheDocument();
  });

  it('does not render PokemonDetails when detailsId is not a valid number', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { detailsId: 'invalid' },
    });

    const { queryByText } = render(<HomeLayout />);
    expect(queryByText('PokemonDetails')).not.toBeInTheDocument();
  });

  it('does not render PokemonDetails when detailsId is undefined', () => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });

    const { queryByText } = render(<HomeLayout />);
    expect(queryByText('PokemonDetails')).not.toBeInTheDocument();
  });
});
