import { baseURL } from "../app";
import { APIKey } from "../app";
import axios from "axios";

export const FetchBalance = ()=>{
    return new Promise((resolve, reject)=>{
        axios.get(`https://apps.wemabank.com/WemaAPIArena/api/ApiArena/GetBalance?vendorID=VIVIDART&accountNumber=999NGN45200544`,
            {
                headers:{
                    // "Content-Type":"application/json",
                    "Ocp-Apim-Subscription-Key": `1ZUMBojVqom+osIK2yMVZzFxoj+ZBuu0hL32/LEasdng=`,
                    }
            }
        ).then((res)=>{
            console.log(res)
            resolve(res.data);
        }).catch((error)=>{
            reject(error)
        })
    })
}

