export interface PayWithPhoneNumberData {
    currency: string;
    businessId?: string;
    businessName?: string,  
    amount?: number,
    phoneNumber:string,
    customer?: Object,
    channel?: string,
 
  }
