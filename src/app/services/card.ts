import { baseURL } from "../app";
import { APIKey } from "../app";
import axios from "axios";
import { PayWithCardFormData } from "@/app/models/cardModel";



const initialiseCard = (data: PayWithCardFormData) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${baseURL}/paymentCard/api/v1/paymentCard/mc/initialize`,
          data,
          {
            headers: {
              "Ocp-Apim-Subscription-Key": `${APIKey}`,
            },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  const authenticateCard =(authenticateData: PayWithCardFormData)=>{
    return new Promise((resolve, reject)=>{
      axios.post(`${baseURL}/paymentcard/api/v1/paymentCard/mc/authenticate`,
        authenticateData, 
        {
          headers:{
            "Ocp-Apim-Subscription-Key": `${APIKey}`,
          }
        }
      )
      .then((res) => {
        console.log(res);
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
    })
  }

export const CardAPIs = {
    initialiseCard,
    authenticateCard,
  };