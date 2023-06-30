import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RadiusState {
  radius: number | null;
}

const initialState: RadiusState = { radius: null };

const radiusSlice = createSlice({
  name: 'radius',
  initialState,
  reducers: {
    setRadius: (state, action: PayloadAction<number>) => {
      state.radius = action.payload;
    },
  },
});

export const { setRadius } = radiusSlice.actions;

export default radiusSlice.reducer;
