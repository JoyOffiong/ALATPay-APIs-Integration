"use client"

import Header from "@/components/header";
import ALATPayLogo from "../../images/alatLogo.png";
import Image from "next/image";
import React, { useState } from "react";

import PayWithCard from "./components/pay_with_card";
import PaywithBankTransfer from "./components/pay_with_bank_transfer";
import { CreditCard, Landmark, NotebookTabs, Smartphone } from "lucide-react";
import PayWithBankDetails from "./components/pay_with_bank_details";
import PayWithPhoneNumber from "./components/pay_with_phoneNumber";

import { BankTransferAPIs } from "../services/bankTransfer";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { addResponse, va_responseItem } from "../store/va_responseSlice";
import { CustomerItem } from "../store/customerSlice";

function PaymentPage() {

    const loggedInCustomer:CustomerItem | null = useSelector((state: RootState) => state.customer.items) || null;
const businessId = process.env.NEXT_PUBLIC_BUSINESSID;



  const [current, setCurrent] = useState<string>("card")

  const dispatch = useDispatch()
  const fetchAccountNumber=()=>{
    BankTransferAPIs.createVirtualAccount({
            businessId,
            channel:"3",
            currency: "NGN",
            description:"Blaqkly checkout",
            customer:loggedInCustomer,
            businessName: "Blaqkly",  
            orderId: `OID- ${uuidv4()}`,
            amount: 100}).then((res:any)=>{
              dispatch(addResponse(res))
            })
  }
  const renderPaymentComponent=()=>{
    switch(current){
      case "card":
        return <PayWithCard />;
      case "bankTransfer":
        return <PaywithBankTransfer  />;
      case "bankDetails":
        return <PayWithBankDetails/>;
      case "phoneNumber":
        return <PayWithPhoneNumber/>;
      default:
        return null;
          }
  }

  

  return (
    <>
      <Header />
      <div className="mt-36 mx-10 md:mx-20">
        <div className="text-left">
          <h3 className="font-bold text-2xl">
            {" "}
            Make your Payments via any of these channels
          </h3>

<div className="flex items-start flex-col  my-10 md:flex-row gap-8">
<div className="shadow-lg p-4 bg-white md:w-1/2 w-full ">
            <div className="m-5 space-y-3">
              <div className="text-left">
                <Image
                  width={100}
                  height={100}
                  src={ALATPayLogo}
                  alt="Alatpay"
                />
                <p className="font-semibold mt-8 text-sm">Payment Methods</p>
              </div>

              <div>
                  <div className={`p-2 text-xs text-left flex items-center gap-2 font-medium border-2 transition-all duration-300 cursor-pointer ${
                    current === "card" ? "bg-slate-300 border-[#000]" : "border-[#6e6e6e]"
                  } hover:bg-slate-300 rounded-md`}
                  onClick={() => setCurrent("card")}>
                  <CreditCard color={`${current === "card" ? "#000000":"#6e6e6e"}`} />   Pay with Card
                  </div>
              </div>
              <div>
                 <div 
                  className={`p-2 text-left font-medium flex items-center gap-2 text-xs border-2 transition-all duration-300 cursor-pointer ${
                    current === "bankTransfer" ? "bg-slate-300 border-[#807575]" : "border-[#6e6e6e]"
                  } hover:bg-slate-300 rounded-md`}
                  onClick={() => {setCurrent("bankTransfer"), fetchAccountNumber()}}
                >
                 <Landmark color={`${current === "bankTransfer" ? "#000000":"#6e6e6e"}`}/>   Pay with Bank Transfer
                  </div>
              </div>
              <div>
                <div     className={`p-2 text-left text-xs flex items-center gap-2 font-medium border-2 transition-all duration-300 cursor-pointer ${
                    current === "bankDetails" ? "bg-slate-300 border-[#000]" : "border-[#6e6e6e]"
                  } hover:bg-slate-300 rounded-md`}
                  onClick={() => setCurrent("bankDetails")}>
                <NotebookTabs color={`${current === "bankDetails" ? "#000000":"#6e6e6e"}`} />  Pay with Bank Details
                  </div>
                
              </div>
              <div>
             
                  <div   className={`p-2 text-left text-xs flex items-center gap-2 font-medium border-2 transition-all duration-300 cursor-pointer ${
                    current === "phoneNumber" ? "bg-slate-300 border-[#000]" : "border-[#6e6e6e]"
                  } hover:bg-slate-300 rounded-md`}>
                  <Smartphone color={`${current === "phoneNumber" ? "#000000":"#6e6e6e"}`} />  Pay with Phone Number
                  </div>
              </div> 
              
              <div>
                
              </div>
            </div>
</div>
<div className="md:w-1/2 w-full">{renderPaymentComponent()}</div>
</div>
         
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
