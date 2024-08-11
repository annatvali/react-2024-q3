import {
  selectItem,
  unselectItem,
  unselectAll,
} from '../src/features/SelectedItemsSlice';
import selectedItemsReducer from '../src/features/SelectedItemsSlice';

describe('SelectedItemsSlice', () => {
  test('should create an action to select an item', () => {
    const expectedAction = {
      type: selectItem.type,
      payload: 'Bulbasaur',
    };
    expect(selectItem('Bulbasaur')).toEqual(expectedAction);
  });

  test('should create an action to unselect an item', () => {
    const expectedAction = {
      type: unselectItem.type,
      payload: 'Bulbasaur',
    };
    expect(unselectItem('Bulbasaur')).toEqual(expectedAction);
  });

  test('should return the initial state', () => {
    const initialState = {
      selectedItems: [],
      selectedItemsCount: 0,
    };
    expect(selectedItemsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  test('should handle selecting an item', () => {
    const previousState = {
      selectedItems: [],
      selectedItemsCount: 0,
    };
    const expectedState = {
      selectedItems: ['Bulbasaur'],
      selectedItemsCount: 1,
    };
    expect(
      selectedItemsReducer(previousState, selectItem('Bulbasaur'))
    ).toEqual(expectedState);
  });

  test('should handle unselecting an item', () => {
    const previousState = {
      selectedItems: ['Bulbasaur'],
      selectedItemsCount: 1,
    };
    const expectedState = {
      selectedItems: [],
      selectedItemsCount: 0,
    };
    expect(
      selectedItemsReducer(previousState, unselectItem('Bulbasaur'))
    ).toEqual(expectedState);
  });

  test('should handle unselecting all items', () => {
    const previousState = {
      selectedItems: ['Bulbasaur', 'Charmander'],
      selectedItemsCount: 2,
    };
    const expectedState = {
      selectedItems: [],
      selectedItemsCount: 0,
    };
    expect(selectedItemsReducer(previousState, unselectAll())).toEqual(
      expectedState
    );
  });
});
