import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {reducer} from "./bookSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
    version: 1
}

const rootReducer = combineReducers({
    books: reducer
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: []
})

export const persistor = persistStore(store)