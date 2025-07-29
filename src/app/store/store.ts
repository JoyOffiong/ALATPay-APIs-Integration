import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import customerReducer from './customerSlice';
import VA_ResponseReducer from './va_responseSlice';
import transactionStatusReducer from './ConfirmStatus'

import {
  persistStore,
  persistReducer, REGISTER,FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';



const rootReducer = combineReducers({
    customer: customerReducer,
    VA_Response: VA_ResponseReducer,
    status : transactionStatusReducer
});

const persistConfig = {
    key:"root",
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),

})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
