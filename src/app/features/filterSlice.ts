import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';


export interface FilterState {
    // Define your state types here
    page:number
    totalDataLength:number,
    sort:string,
    query:string,
    regions:string[],
}

export const regions = [
    "Americas",
    "Antarctic",
    "Africa",
    "Asia",
    "Europe",
    "Oceania",
  ];

const initialState: FilterState = {
    // Set initial state values here
    page:1,
    totalDataLength:0,
    sort:"desc",
    query:"",
    regions,
};

export const filterSlice = createSlice({
    name: 'filter', 		//todo
    initialState,
    reducers: {
         increment: (state) => {
            state.page +=1;
         },
         decrement: (state) => {
            state.page -= 1
         },
         reset : (state) =>{
             state.page = 1
         },
         specific:(state,action:PayloadAction<number>)=>{
            state.page = action.payload
         },
         setLength:(state,action:PayloadAction<number>)=>{
            state.totalDataLength = action.payload

         },
         setSort:(state,action:PayloadAction<string>) =>{
                  state.sort=action.payload
         },
         setQuery:(state,action:PayloadAction<string>) => {
            state.query=action.payload
         },
         addRegion: (state,action:PayloadAction<string>) =>{
            state.regions.push(action.payload)
         },
         removeRegion:(state,action:PayloadAction<string>)=>{
            state.regions=state.regions.filter(el=>el!==action.payload)
         }
}
});


export const {decrement,increment,reset,specific,setLength,setSort,setQuery,addRegion,removeRegion} = filterSlice.actions

export const selectPage = (state: RootState) => state.filter.page
export const selectTotalLength = (state: RootState) => state.filter.totalDataLength
export const selectSort = (state: RootState) => state.filter.sort
export const selectQuery = (state: RootState) => state.filter.query
export const selectRegions = (state: RootState) => state.filter.regions

export default filterSlice.reducer