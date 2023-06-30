import { configureStore } from '@reduxjs/toolkit';

import keywordsReducer from './slices/keywordsSlice';
import locationReducer from './slices/locationSlice';
import radiusReducer from './slices/radiusSlice';
import restaurantsReducer from './slices/restaurantsSlice';

const store = configureStore({
  reducer: {
    location: locationReducer,
    radius: radiusReducer,
    keywords: keywordsReducer,
    restaurants: restaurantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
