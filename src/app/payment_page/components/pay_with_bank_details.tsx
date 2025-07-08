import { PayWithBankDetailsData } from '@/app/models/bankDetailsModel';
import { BankDetailsAPI, validatePayment } from '@/app/services/bankDetails';
import InputBoxComp from '@/components/inputField'
import LoadingButton from '@/components/loadingbutton'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { businessId } from "../../app";
import verify from "../../../images/verify.png";
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { clearResponse} from "@/app/store/va_responseSlice";
import { CustomerItem } from '@/app/store/customerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';


function PayWithBankDetails() {

   const { control, handleSubmit } = useForm<PayWithBankDetailsData>({
      mode: "onChange"
        });
const [loading, setLoading] = useState<boolean>(false)
const [otpScreen, setOtpScreen] = useState<boolean>(false)
const [bankDetails, setBankDetails] = useState<boolean>(true)
  const [successScreen, setSuccessScreen] = useState<boolean>(false);

const [transId, setTransId] = useState<string>("")

  const router = useRouter(); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (router) {
      console.log("Router is mounted");
    }
  }, [router]);
  const navigateBack =()=>{
dispatch(clearResponse())
    router.push("../")  }
    const loggedInCustomer:CustomerItem | null = useSelector((state: RootState) => state.customer.items) || null;

const onsubmit=(data:PayWithBankDetailsData)=>{
  setLoading(true)
  BankDetailsAPI.sendOTP({
      accountNumber: data.accountNumber,
            currency: "NGN",
             businessId,
                    channel:"1",
                    description:"Blaqkly checkout",
                    customer:loggedInCustomer,
                    bankCode: "035",

                    businessName: "Blaqkly",  
            orderId: `OID- ${uuidv4()}`,
                    amount: loggedInCustomer?.amount,
          }
  )
  .then((res:any)=>{
     setBankDetails(false)
     setTransId(res?.transactionId)
    setLoading(false)
    setOtpScreen(true)
  })
  .catch((err:any)=>{
    setLoading(false)
    
  })
}

const submitOTP=(data:validatePayment)=>{
  setLoading(true)
  console.log(data)
  BankDetailsAPI.validateOTP({otp:data.otp, transactionId:transId})
  .then((res:any)=>{
    setLoading(false)
        setOtpScreen(false)

     if(res.message){
      setSuccessScreen(true)
    };
  })
  .catch((err:any)=>{
    setLoading(false)
  })
}
  return (
    <div>
    <div className="shadow-lg p-14 space-y-2 w-full bg-white ">
      {bankDetails && (
         <div>
         <p className=" font-medium text-xl">
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
    )}
      { otpScreen && (  <div>
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
        </div>)
      }
     
    {successScreen && (
        <div className="space-y-4 text-center">
          <p className="text-lg font-bold">Transaction Successful</p>
          <Image src={verify} alt="verify" width={100} height={100} className='flex justify-self-center'/>
          <div className="text-center flex pt-4 justify-center">
                  <button
                    onClick={() => navigateBack()}
                    className=" flex gap-4 px-4 py-2 rounded-md text-[#fff4a3]  bg-[#272934]"
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
