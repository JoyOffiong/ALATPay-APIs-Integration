"use client"

import Header from "@/components/header";
import InputBoxComp from "@/components/inputField";
import { Box, Button, CircularProgress, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import {CardAPIs} from "../../services/card"
import { useForm } from "react-hook-form";
import { businessId } from "@/app/app";
import { PayWithCardFormData } from "@/app/models/cardModel";
import style from "@/components/style";
import { useRouter } from "next/router";


function PayWithCard() {


  const customerData = JSON.parse(localStorage.getItem("customer")|| "[]");

const [redirect, setRedirect] = useState<string>("")
const [loading, setLoading] = useState<boolean>(false)
const [showOTPModal, setShowOTPModal] = useState<boolean>(false)

  const { control, handleSubmit } = useForm<PayWithCardFormData>({
    mode: "onChange"
      });

      // const router = useRouter()
      //  useEffect(() => {
      //     if (router) {
      //       console.log("Router is mounted");
      //     }
      //   }, [router]);
      const closeOTPModal =()=>{
        setShowOTPModal(false)
      }

      const onsubmit=(data:PayWithCardFormData)=>{
        setLoading(true)
        const cardYear = data?.MonthYear?.split("/").pop()
        const cardMonth = data.MonthYear?.slice(0, 2)
      
        //initialize card
       CardAPIs.initialiseCard({
        cardNumber: data.cardNumber,
        currency: "NGN",
        businessId: businessId,
      })
    .then((response:any) => {

      const transid= response.data.data.transactionId;
      const orderid= response.data.data.orderId;
     
      //authenticate Card
       CardAPIs.authenticateCard({
        cardNumber: data.cardNumber,
        currency: "NGN",
        businessId: businessId,
        channel:"1",
        description:"Blaqkly checkout",
        customer:customerData,
        businessName: "Blaqkly",  
        transactionId: transid,
        orderId: orderid,
        amount: 100,
        securityCode:data.securityCode,
        cardMonth,
        cardYear
      }).then((response:any) => {
        setLoading(false)
        setRedirect(response.data.data.redirectHtml)
       setShowOTPModal(true)
       
      })
      .catch((error:any) => {
        console.error("Error authenticating card:", error);
      });
        })
    .catch((error:any) => {
      console.error("Error initializing card:", error);
    });

    

      }


  return (
    <div>
      <div className="shadow-lg p-4 space-y-3 w-full bg-white ">
        <p className=" font-bold text-2xl my-10">
          Pay with Card
        </p>
       
        <form onSubmit={handleSubmit(onsubmit)} >
        <div className="space-y-8">

        <div>
        <InputBoxComp 
        name="cardNumber"
         control={control}
                  type="text"
                  label="Card Number" />
        </div>

        <div className="flex space-x-4 justify-center ">
        <InputBoxComp 
        name="MonthYear"
         control={control}
                  type="text"
                  label="Month/Year" />
       
       <InputBoxComp 
        name="securityCode"
         control={control}
                  type="text"
                  label="cvv" />
        </div>

        <div className="flex flex-end justify-end " >
                <Button 
                sx={{
                    '&:hover': {
      backgroundColor: 'blue',
                      display:"flex",
                      flexDirection:"row",
                      gap:"2px"
    },
                }}
                type="submit" className="bg-secondary px-6 py-1 rounded-md bg-blue-600 border-2 text-white border-blue-400 text-lightBrown">
                    Pay  {loading ? <CircularProgress size= "5px"/>  : ""}
                </Button>
              </div>
        
        </div>
        </form>
        
      </div>
      
            <div>
            {!loading && redirect !== null && (
              <div>
               <Modal
               open={showOTPModal}
               onClose={closeOTPModal}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
             >
               <Box sx={style}>
              <iframe
            srcDoc={redirect}
            style={{ width: "100%", height: "500px", border: "none" }}
            title="Authentication Page"
          ></iframe></Box>
           </Modal>
              </div>
              
             )
            }
          </div>
       
      
    </div>
  );
}

export default PayWithCard;
