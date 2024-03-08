import { configureStore } from '@reduxjs/toolkit'
import { countriesApi } from './services/countries'
import filterReducer from "./features/filterSlice"
export const store = configureStore({
    reducer: {
        filter:filterReducer,
        [countriesApi.reducerPath]:countriesApi.reducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(countriesApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch