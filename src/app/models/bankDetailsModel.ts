

export interface PayWithBankDetailsData {
    businessId: string,
    businessName: string,
    currency: string,
    orderId: string,
    description: string,
    transactionId?: string,
    channel: string,
    otp?: string,
    amount: number,
    accountNumber: string,
    bankCode: string,
    customer: object
  }
