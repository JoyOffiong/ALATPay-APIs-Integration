import { CustomerItem } from "../store/customerSlice";


export interface PayWithBankTransferData {
    currency?: string;
    businessId?: string;
    businessName?: string,  
    amount?: 100,
    orderId?:  string,
    customer?: CustomerItem | null,
    description?: string,
    channel?: string,
    transactionId?: string  }
