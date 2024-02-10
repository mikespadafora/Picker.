import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type KeywordsState = string[];

const initialState: KeywordsState = [];

const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {
    storeKeywords: (state, action: PayloadAction<string[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { storeKeywords } = keywordsSlice.actions;

export default keywordsSlice.reducer;
