

export interface PayWithBankDetailsData {
    businessId: string,
    businessName: string,
    currency: string,
    orderId: string,
    description: string,
    transactionId?: string,
    channel: string,
    otp?: string,
    amount: string,
    accountNumber: string,
    bankCode: string,
    customer: object
  }
