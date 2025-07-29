import { baseURL } from "../app";
import axios from "axios";
import { PayWithBankDetailsData } from "../models/bankDetailsModel";
import { headers } from "next/headers";

export type validatePayment={
  otp?: string | undefined,
  transactionId?: string | undefined
} 

const APIKey = process.env.NEXT_PUBLIC_API_KEY;

const sendOTP =(data:PayWithBankDetailsData)=>{
    return new Promise((resolve, reject)=>{
        axios.post (`${baseURL}/alatpayaccountnumber/api/v1/accountNumber/sendOtp`, data,
            {
                headers:{
                    "Content-Type":"application/json",
                    "Ocp-Apim-Subscription-Key": `${APIKey}`,
                    }
            }
        ) .then((res)=>{
                resolve(res.data.data);
            }).catch((error)=>{
                reject(error)
            })
        
    })
}

const validateOTP =(data:validatePayment)=>{
    return new Promise ((resolve, reject)=>{
        axios.post(`${baseURL}/alatpayaccountnumber/api/v1/accountNumber/validateAndPay`, data,
            {
                headers:{
                    "Content-Type":"application/json",
                    "Ocp-Apim-Subscription-Key": `${APIKey}`,
                    }
            }
        ).then((res)=>{
            resolve(res.data);
        }).catch((error)=>{
            reject(error)
        })
    })
}

export const BankDetailsAPI={
    sendOTP, validateOTP
}
