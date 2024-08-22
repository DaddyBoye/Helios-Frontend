import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    divElements: [],
    elementCount: 0,
}

export const updateTime = createSlice({
    name: "updateTime",
    initialState, 
    reducers: {

    }
})

export default updateTime.reducer