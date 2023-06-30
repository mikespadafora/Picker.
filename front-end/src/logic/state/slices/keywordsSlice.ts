import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type KeywordsState = string[];

const initialState: KeywordsState = [];

const keywordsSlice = createSlice({
  name: 'keywords',
  initialState,
  reducers: {
    setKeywords: (state, action: PayloadAction<string[]>) => action.payload,
    addKeyword: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    removeKeyword: (state, action: PayloadAction<string>) => {
      return state.filter((keyword) => keyword !== action.payload);
    },
  },
});

export const { setKeywords, addKeyword, removeKeyword } = keywordsSlice.actions;

export default keywordsSlice.reducer;
