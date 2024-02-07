import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  locationDenied: boolean;
}

const initialState: LocationState = {
  latitude: null,
  longitude: null,
  locationDenied: false,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.locationDenied = action.payload.locationDenied;

      console.log('Location Stored Successfully: ', action.payload);
    },

    setLocationDenied: (state, action: PayloadAction<boolean>) => {
      state.locationDenied = action.payload;
    },
  },
});

export const { setLocation, setLocationDenied } = locationSlice.actions;

export default locationSlice.reducer;
