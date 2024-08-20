import {configureStore} from "@reduxjs/toolkit"
import { updateTime } from "./timeUpdate"

export const store = configureStore({
    reducer: {
        updateState: updateTime.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch