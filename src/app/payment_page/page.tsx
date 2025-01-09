import Header from "@/components/header";
import ALATPayLogo from "../../images/alatLogo.png";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import PayWithCard from "./components/pay_with_card";

function PaymentPage() {
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
<div className="shadow-lg p-4 bg-white md:w-1/3 w-full ">
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
               
                  <div className="p-2 text-xs text-left font-medium border-2 transition-all duration-300 cursor-pointer border-blue-600  hover:bg-slate-300 rounded-md">
                    Pay with Card
                  </div>
              </div>
              <div>
                 <div className="p-2 text-left font-medium text-xs border-2 transition-all duration-300 cursor-pointer border-blue-600  hover:bg-slate-300 rounded-md">
                    Pay with Bank Transfer
                  </div>
              </div>
              <div>
                <div className="p-2 text-left text-xs font-medium border-2 transition-all duration-300 cursor-pointer border-blue-600  hover:bg-slate-300 rounded-md">
                    Pay with Bank Details
                  </div>
                
              </div>
              <div>
             
                  <div className="p-2 text-left text-xs font-medium border-2 transition-all duration-300 cursor-pointer border-blue-600  hover:bg-slate-300 rounded-md">
                    Pay with Phone Number
                  </div>
              </div> <div>
                
              </div>
            </div>
</div>
<div className="md:2/3 w-full">
  <PayWithCard/>
</div>
</div>
         
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
