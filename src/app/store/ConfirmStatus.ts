import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerItem } from "./customerSlice";

 export interface StatusItem{
    customer: CustomerItem
    amount?: number;
}

interface StatusState{
    items: StatusItem | null;
}

const initialState:StatusState={
    items: null,
}

const statusSlice = createSlice({
    name:"status",
    initialState,
    reducers:{
        addStatus(state, action:PayloadAction<StatusItem>){
            state.items= action.payload
        },

        clearStatus(state){
            state.items = null
        }
    }
})

export const {addStatus, clearStatus} = statusSlice.actions;
export default statusSlice.reducer