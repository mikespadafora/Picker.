import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Restaurant {
  name: string;
  id: number;
}

type RestaurantsState = Restaurant[];

const initialState: RestaurantsState = [];

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (state, action: PayloadAction<Restaurant[]>) =>
      action.payload,
  },
});

export const { setRestaurants } = restaurantsSlice.actions;

export default restaurantsSlice.reducer;
