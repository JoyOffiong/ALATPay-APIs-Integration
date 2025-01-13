

export interface PayWithBankTransferData {
    currency: string;
    businessId?: string;
    businessName?: string,  
    amount?: number,
    orderId?:  string,
    customer?: Object,
    description?: string,
    channel?: string,
    transactionId?: string
  }
