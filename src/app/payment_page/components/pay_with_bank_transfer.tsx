import { BankTransferAPIs } from '@/app/services/bankTransfer';
import { businessId } from "@/app/app";
import { v4 as uuidv4 } from 'uuid';


import React, { useEffect, useState } from 'react'

function PaywithBankTransfer() {
  
 const [virtualAccount, setVirtualAccount] = useState<object>([])

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
          amount: 100}).then((response)=>{
              console.log(response)

              // setTimeout(() => {
                
              
              // }, 10000);

  })


});


  return (
    <div className='shadow-lg p-4 space-y-3 w-full bg-white'>
        <div className='mx-auto text-center leading-4'>
            {/* businessName */}
            <p className='text-lg font-bold'>Blaqkly</p>
            {/* Account Number */}
            <p className='text-2xl font-bold'>1231232323</p>
            {/* Bank */}
            <p className='text-base font-light '>Wema Bank</p>

        </div>
    </div>
  )
}

export default PaywithBankTransfer
