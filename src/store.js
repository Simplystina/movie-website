import { configureStore } from '@reduxjs/toolkit';
import trendingSlice from './features/trendingSlice'
import moviesSlice from './features/moviesSlice'
import tvshowsSlice from './features/tvshowsSlice';
import searchSlice from './features/searchSlice';

export const store = configureStore({
    reducer: {
       trending:trendingSlice,
       movies: moviesSlice,
       tvshows: tvshowsSlice,
       search: searchSlice
    },
  });