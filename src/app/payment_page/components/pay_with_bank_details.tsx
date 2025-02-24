"use client"

import { PayWithBankDetailsData } from '@/app/models/bankDetailsModel';
import { BankDetailsAPI } from '@/app/services/bankDetails';
import InputBoxComp from '@/components/inputField'
import LoadingButton from '@/components/loadingbutton'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { businessId } from "../../app";
import verify from "../../../images/verify.png";
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

function PayWithBankDetails() {

   const { control, handleSubmit, reset } = useForm<PayWithBankDetailsData>({
      mode: "onChange"
        });
const [loading, setLoading] = useState<boolean>(false)
const [otpScreen, setOtpScreen] = useState<boolean>(false)
  const [successScreen, setSuccessScreen] = useState<boolean>(false);
  const [transId, setTransId] = useState<string>("")

  const router = useRouter(); 
  useEffect(() => {
    if (router) {
      console.log("Router is mounted");
    }
  }, [router]);
  const navigateBack =()=>{
    router.push
  }
const customerData = JSON.parse(localStorage.getItem("customer")|| "[]");

const onsubmit=(data:PayWithBankDetailsData)=>{
  setLoading(true)
  BankDetailsAPI.sendOTP({
      accountNumber: data.accountNumber,
            currency: "NGN",
             businessId,
                    channel:"1",
                    description:"Blaqkly checkout",
                    customer:customerData,
                    bankCode: "035",

                    businessName: "Blaqkly",  
            orderId: `OID- ${uuidv4()}`,
                    amount: 100,
          }
  )
  .then((res:any)=>{
    console.log(res)
    setLoading(false)
    setOtpScreen(true)
    setTransId(res.transactionId)
    reset({})
  })
  .catch((err:any)=>{
    setLoading(false)
    
  })
}

const submitOTP=(data:PayWithBankDetailsData)=>{
  setLoading(true)
  BankDetailsAPI.validateOTP({...data, transactionId:transId})
  .then((res:any)=>{
    setLoading(false)
    if(res.status === 201){
      setOtpScreen(false)
      setSuccessScreen(true)
    }
  })
  .catch((err:any)=>{
    setLoading(false)
  })
}
  return (
    <div>
    <div className="shadow-lg p-8 md:p-14 space-y-2 w-full bg-white ">
      { !otpScreen && !successScreen ? (
         <div>
         <p className=" font-medium text-lg md:text-xl">
          Enter your Wema Bank Account Number
         </p>
        
         <form onSubmit={handleSubmit(onsubmit)} >
         <div className='mt-4'>
   
         <div>
         <InputBoxComp 
         name="accountNumber"
          control={control}
                   type="text"
                   label="account number" />
         </div>
   
         <div className="flex flex-end mt-4 justify-end " >
                <LoadingButton
                 text="Pay" 
                 loading={loading}
                 />
               </div>
         
         </div>
         </form>
         </div>
      ) :
      (
        <div>
        <p className=" font-medium text-xl">
         Enter OTP
        </p>
       
        <form onSubmit={handleSubmit(submitOTP)} >
        <div className='mt-4'>
  
        <div>
        <InputBoxComp 
        name="otp"
         control={control}
                  type="text"
                  label="OTP" />
        </div>
  
        <div className="flex flex-end mt-4 justify-end " >
               <LoadingButton
                text="Pay" 
                loading={loading}
                />
              </div>
        
        </div>
        </form>
        </div>
      )
      }
     
     
      
    </div>
    
    <div className="shadow-lg p-14 space-y-2 w-full bg-white ">
    {!otpScreen && successScreen && (
        <div className="space-y-4">
          <p className="text-lg font-bold">Transaction Successful</p>
          <Image src={verify} alt="verify" width={100} height={100} />
          <div className="text-center flex justify-center">
                  <button
                    onClick={() => navigateBack()}
                    className="bg-secondary flex gap-4 px-6 py-3 rounded-md bg-blue-600  text-white border-blue-400 text-lightBrown"
                  >
Close                  </button>
                </div>

        </div>
      )}
    </div>
    
    
  </div>
  )
}

export default PayWithBankDetails
