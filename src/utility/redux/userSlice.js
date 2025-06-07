'use client'
import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState:  {},
    reducers: {
        loggedIn: (state, action) => {
            return action.payload
        },
        signOut: () => {
            return {}

        }
    }
})

export const { loggedIn, signOut } = userSlice.actions

export default userSlice.reducer

