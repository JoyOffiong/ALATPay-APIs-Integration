import { baseURL } from "../app";
import { APIKey } from "../app";
import axios from "axios";
import { PayWithBankDetailsData } from "../models/bankDetailsModel";
import { headers } from "next/headers";

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
                resolve(res);
            }).catch((error)=>{
                reject(error)
            })
        
    })
}

const validateOTP =(data:PayWithBankDetailsData)=>{
    return new Promise ((resolve, reject)=>{
        axios.post(`${baseURL}/bank-transfer/api/v1/bankTransfer/virtualAccount`, data,
            {
                headers:{
                    "Content-Type":"application/json",
                    "Ocp-Apim-Subscription-Key": `${APIKey}`,
                    }
            }
        ).then((res)=>{
            resolve(res);
        }).catch((error)=>{
            reject(error)
        })
    })
}

export const BankDetailsAPI={
    sendOTP, validateOTP
}
