"use client"


import React, { useEffect, useState } from 'react'
import LoadingButton from '@/components/loadingbutton';
 
interface VirtualAccount {
  virtualBankAccountNumber: string;
    bankName: string;
    accountName: string;
    expirationDate?: string; // Optional property
  }
function PaywithBankTransfer({accountName, virtualBankAccountNumber, bankName,expirationDate}:VirtualAccount) {
  console.log(virtualBankAccountNumber.)
  console.log(virtualBankAccountNumber)
const [pendingMode , setPendingMode] = useState<boolean>(false) 
const [loading, setLoading] =  useState<boolean>(false)



// const confirmPayment=()=>{
//   BankTransferAPIs.ConfirmTransfer().then((res)=>{
//     console.log(res)
//      setLoading(true)
//   })
// }

  return (
    <>
   
     <div className='shadow-lg p-4 space-y-3 w-full bg-white'>
      {pendingMode === false ? 
      ( <div className='mx-auto text-center leading-4'>
         {/* businessName */}
         <p className='text-lg font-bold'>Blaqkly</p>
         {/* Account Number */}
         <p className='text-2xl font-bold'>{virtualBankAccountNumber}</p>
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
