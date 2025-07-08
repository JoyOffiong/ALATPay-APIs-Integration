import { CustomerItem } from "../store/customerSlice";


export interface PayWithBankDetailsData {
    businessId: string,
    businessName: string,
    currency: string,
    orderId: string,
    description: string,
    transactionId?: string,
    channel: string,
    otp?: string,
    amount: number | undefined,
    accountNumber: string,
    bankCode: string,
    customer?: CustomerItem | null,
  }
