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
            resolve(res);
        }).catch((error)=>{
            reject(error)
        })
    })
}

const ConfirmTransfer= (data:PayWithBankTransferData)=>{
    return new Promise((resolve, reject)=>{
        axios.get(`${baseURL}/bank-transfer/api/v1/bankTransfer/transactions/${data.transactionID}`,
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

export const BankTransferAPIs={
    createVirtualAccount, ConfirmTransfer
}