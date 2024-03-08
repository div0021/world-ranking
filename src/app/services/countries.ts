import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CountryType } from "../../utils/dataType";


export const countriesApi = createApi({
    reducerPath:'countriesApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://restcountries.com/v3.1/'
    }),
    endpoints:(builder) => ({
        getCountriesData: builder.query<CountryType[],string>({
            query:() => `all?fields=name,flags,area,population,region`
        }),
    })
})

export const {useGetCountriesDataQuery} = countriesApi