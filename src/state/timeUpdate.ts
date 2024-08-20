import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    divElements: [],
    elementCount: 0,
}

export const updateTime = createSlice({
    name: "updateTime",
    initialState, 
    reducers: {
        clearArray: (state)=>{
            state.divElements = [];
            state.elementCount = 0
        }
    }
})

export const {clearArray} =updateTime.actions

export default updateTime.reducer