import { baseURL } from "../app";
import { APIKey } from "../app";
import axios from "axios";
import { PayWithBankTransferData } from "../models/bankTransferModel";


const createVirtualAccount = (data:PayWithBankTransferData)=>{
    return new Promise ((resolve, reject)=>{
        axios.post(`${baseURL}/bank-transfer/api/v1/bankTransfer/virtualAccount`, data,
            {
                headers:{
                    "Content-Type":"application/json",
                    "Ocp-Apim-Subscription-Key": `${APIKey}`,
                    }
            }
        ).then((res)=>{
            resolve(res.data.data);
        }).catch((error)=>{
            reject(error)
        })
    })
} 

const ConfirmTransfer= (data:PayWithBankTransferData)=>{
    return new Promise((resolve, reject)=>{
        axios.get(`${baseURL}/alatpaytransaction/api/v1/transactions/${data.transactionId}`,
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

export const BankTransferAPIs={
    createVirtualAccount,
    ConfirmTransfer
}