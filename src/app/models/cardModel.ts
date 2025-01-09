export interface PayWithCardFormData {
    cardNumber: string;
    currency: string;
    businessId?: string;
    cardMonth?: string;
    cardYear?: string,
    securityCode?: string,
    businessName?: string,  
    amount?: number,
    orderId?:  string,
    customer?: Object,
    description?: string,
    channel?: string,
    transactionId?: string,
    MonthYear?:string
  }
