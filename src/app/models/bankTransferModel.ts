

export interface PayWithBankTransferData {
    currency?: string;
    businessId?: string;
    businessName?: string,  
    amount?: 100,
    orderId?:  string,
    customer?: Object,
    description?: string,
    channel?: string,
    transactionId?: string  }
