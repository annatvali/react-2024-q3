import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Flayout from '../src/components/Flayout';
import { unselectAll } from '../src/features/SelectedItemsSlice';
import useTheme from '../src/context/useTheme';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../src/context/useTheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Flyout Component', () => {
  const mockDispatch = jest.fn();
  const mockUseTheme = useTheme as jest.Mock;

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        selectedItems: {
          selectedItems: { 1: 'bulbasaur', 2: 'ivysaur' },
        },
      })
    );
    mockUseTheme.mockReturnValue({ theme: 'light' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly when there are selected items', () => {
    render(<Flayout />);
    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  test('does not render when there are no selected items', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        selectedItems: {
          selectedItems: {},
        },
      })
    );
    const { container } = render(<Flayout />);
    expect(container.firstChild).toBeNull();
  });

  test('clicking "Unselect all" button dispatches unselectAll action', () => {
    render(<Flayout />);
    const unselectAllButton = screen.getByText('Unselect all');
    fireEvent.click(unselectAllButton);
    expect(mockDispatch).toHaveBeenCalledWith(unselectAll());
  });
});
