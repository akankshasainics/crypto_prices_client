import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './reducers/stockReducer';

const store = configureStore(
    stockReducer
)

export default store;