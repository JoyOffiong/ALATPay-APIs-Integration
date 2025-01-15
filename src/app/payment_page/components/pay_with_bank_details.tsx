import { PayWithBankDetailsData } from '@/app/models/bankDetailsModel';
import { BankDetailsAPI } from '@/app/services/bankDetails';
import InputBoxComp from '@/components/inputField'
import LoadingButton from '@/components/loadingbutton'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function PayWithBankDetails() {

   const { control, handleSubmit } = useForm<PayWithBankDetailsData>({
      mode: "onChange"
        });
const [loading, setLoading] = useState<boolean>(false)

const onsubmit=(data:PayWithBankDetailsData)=>{
  setLoading(true)
  BankDetailsAPI.sendOTP(data).then((res)=>{
    console.log(res)
  })
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

      <div className="flex flex-end justify-end " >
             <LoadingButton
              text="Pay" 
              loading={loading}/>
            </div>
      
      </div>
      </form>
      
    </div>
    
     
    
  </div>
  )
}

export default PayWithBankDetails
