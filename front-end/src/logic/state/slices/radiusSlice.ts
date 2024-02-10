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
      state.radius = Math.floor(action.payload * 1609);
      console.log('Successfully Stored Search Radius: ', state.radius);
    },
  },
});

export const { setRadius } = radiusSlice.actions;

export default radiusSlice.reducer;
