import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Pagination from '../src/components/Pagination';
import { setCurrentPage } from '../src/features/PokemonSlice';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Pagination Component', () => {
  const mockRouterPush = jest.fn();
  const mockDispatch = jest.fn();
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Previous button is disabled on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  test('Next button is disabled on the last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('Clicking Next button calls onPageChange and updates router', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentPage(2));
    expect(mockRouterPush).toHaveBeenCalledWith('/page/2');
  });
  test('Clicking Previous button calls onPageChange and updates router', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );
    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentPage(2));
    expect(mockRouterPush).toHaveBeenCalledWith('/page/2');
  });
});
