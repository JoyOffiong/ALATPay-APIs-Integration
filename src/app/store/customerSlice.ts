import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 export interface CustomerItem{
    firstName: string | undefined;
    lastName: string | undefined;
    email: number;
    phone: string;
    amount: number;
}

interface CartState{
    items: CustomerItem | null;
}

const initialState:CartState={
    items: null
}

const customerSlice = createSlice({
    name:"customer",
    initialState,
    reducers:{
        addCustomer(state, action:PayloadAction<CustomerItem>){
           
            state.items = action.payload;
        },
        
        clearCustomer(state){
            state.items = null;
        }
       
    }
})

export const {addCustomer, clearCustomer} = customerSlice.actions;
export default customerSlice.reducer;