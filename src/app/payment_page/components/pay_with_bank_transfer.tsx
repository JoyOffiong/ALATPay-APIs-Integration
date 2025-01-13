import { BankTransferAPIs } from '@/app/services/bankTransfer';
import { businessId } from "@/app/app";
import { v4 as uuidv4 } from 'uuid';


import React, { useEffect, useState } from 'react'
import LoadingButton from '@/components/loadingbutton';

function PaywithBankTransfer() {
  
 const [virtualAccount, setVirtualAccount] = useState<object>([])
const [pendingMode , setPendingMode] = useState<boolean>(false) 
const [loading, setLoading] =  useState<boolean>(false)

 useEffect(() => {
  const customerData = JSON.parse(localStorage.getItem("customer")|| "[]");
  BankTransferAPIs.createVirtualAccount({
          businessId,
          channel:"3",
          currency: "NGN",
          description:"Blaqkly checkout",
          customer:customerData,
          businessName: "Blaqkly",  
          orderId: `OID- ${uuidv4()}`,
          amount: 100}).then((res:any)=>{
              setVirtualAccount(res)
              setPendingMode(true)
          })


});

// const confirmPayment=()=>{
//   BankTransferAPIs.ConfirmTransfer().then((res)=>{
//     console.log(res)
//      setLoading(true)
//   })
// }

  return (
    <>
   
     <div className='shadow-lg p-4 space-y-3 w-full bg-white'>
      {!pendingMode ? 
      ( <div className='mx-auto text-center leading-4'>
         {/* businessName */}
         <p className='text-lg font-bold'>Blaqkly</p>
         {/* Account Number */}
         <p className='text-2xl font-bold'>1231232323</p>
         {/* Bank */}
         <p className='text-base font-light '>Wema Bank</p>

     </div>) :  (
              <div className='mx-auto text-center leading-4'>
  <p className='text-lg font-bold'>Transaction in Progress</p>
  {/* Account Number */}
  <p className='text-md font-medium'>Click below to confirm transaction status</p>
  {/* Bank */}
  <LoadingButton
                text="Pay" 
                loading={loading}/>
              </div>)}

</div>  
   
    </>
    
  )
}

export default PaywithBankTransfer
