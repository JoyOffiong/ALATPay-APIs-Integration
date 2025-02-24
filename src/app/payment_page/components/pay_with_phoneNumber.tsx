import { PayWithPhoneNumberData } from '@/app/models/phoneNumber';
import InputBoxComp from '@/components/inputField';
import LoadingButton from '@/components/loadingbutton';
import React from 'react'
import { useForm } from 'react-hook-form';

function PayWithPhoneNumber() {

const { control, handleSubmit, reset } = useForm<PayWithPhoneNumberData>({
      mode: "onChange"
        });

    const submitPhoneNumber =(data:PayWithPhoneNumberData)=>{
    console.log(data)
    }
  return (
    <div>
            <div className="shadow-lg p-4 font-bold space-y-3 w-full bg-white">

            <p className="pt-6">
              Pay with Phone Number
            </p>  
            <form onSubmit={handleSubmit(submitPhoneNumber)} >
        <div className='mt-4'>
  
        <div>
        <InputBoxComp 
        name="phoneNumber"
         control={control}
                  type="text"
                  label="Enter PhoneNumber" />
        </div>
  
        <div className="flex flex-end mt-4 justify-end " >
               <LoadingButton
                text="Pay 100" 
                />
              </div>
        
        </div>
        </form>
            
            
            
            </div>
    </div>
  )
}

export default PayWithPhoneNumber
