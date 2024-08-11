import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedItemsState {
  selectedItems: string[];
  selectedItemsCount: number;
}

const initialState: SelectedItemsState = {
  selectedItems: [],
  selectedItemsCount: 0,
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<string>) => {
      state.selectedItems.push(action.payload);
      state.selectedItemsCount += 1;
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item !== action.payload
      );
      state.selectedItemsCount -= 1;
    },
    unselectAll: (state) => {
      state.selectedItems = [];
      state.selectedItemsCount = 0;
    },
  },
});

export const { selectItem, unselectItem, unselectAll } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
