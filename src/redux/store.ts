import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import nftReducer from './nftSlice';
import bookmarkReducer from './bookmarkSlice';

const rootReducer = combineReducers({
  nftReducer,
  bookmarkReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type ReduxState = ReturnType<typeof rootReducer>;

export default store;
