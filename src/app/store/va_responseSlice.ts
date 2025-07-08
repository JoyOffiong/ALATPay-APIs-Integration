import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 export interface va_responseItem{
   virtualBankAccountNumber: string | undefined;
    currency: string | undefined;
    businessId: string;
    phone: string;
    amount: number;
    transactionId: string;
    customer:object | undefined;
}

interface va_responseState{
    items: va_responseItem | null;
}

const initialState:va_responseState={
    items: null
}

const VA_ResponseSlice = createSlice({
    name:"VA_Response",
    initialState,
    reducers:{
        addResponse(state, action:PayloadAction<va_responseItem>){
           
            state.items = action.payload;
        },
        
        clearResponse(state){
            state.items = null;
        }
       
    }
})

export const {addResponse, clearResponse} = VA_ResponseSlice.actions;
export default VA_ResponseSlice.reducer;