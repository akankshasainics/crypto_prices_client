import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './reducers/stockReducer.ts';
import { loadState, saveState } from './localStorageHelper.ts';

const persistedState = loadState();

export const store = configureStore(
    {
        reducer: stockReducer,
        preloadedState: persistedState
    },
)

store.subscribe(() => { console.log(store.getState());saveState(store.getState())});
  
  export default store;
