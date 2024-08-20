import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../types/FormData';

interface FormState {
  data: FormData[];
  newEntryIndex: number | null;
  imageBase64: string | null;
}

const initialState: FormState = {
  data: [],
  newEntryIndex: null,
  imageBase64: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.data.push(action.payload);
      state.newEntryIndex = state.data.length - 1;
    },
    clearNewEntryIndex: (state) => {
      state.newEntryIndex = null;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.imageBase64 = action.payload;
    },
  },
});

export const { addFormData, clearNewEntryIndex, setImage } = formSlice.actions;
export default formSlice.reducer;
