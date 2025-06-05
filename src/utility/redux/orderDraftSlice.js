'use client'
import { createSlice } from "@reduxjs/toolkit"




export const orderDraftSlice = createSlice({
    name: "orderDraft",
    initialState:  {},
    reducers: {
        addOrderDraft: (state, action) => {
            return action.payload
            
        },
        
        removeOrderDraft: (state, action) =>{
            return {}
        }
    }
})

export const { addOrderDraft, removeOrderDraft } = orderDraftSlice.actions

export default orderDraftSlice.reducer

