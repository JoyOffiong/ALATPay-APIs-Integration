"use client";

import React, { useEffect, useState } from "react";
import LoadingButton from "@/components/loadingbutton";
import { CircularProgress, LinearProgress } from "@mui/material";
import { BankTransferAPIs } from "@/app/services/bankTransfer";
import verify from "../../../images/verify.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { clearResponse, va_responseItem } from "@/app/store/va_responseSlice";
import { RootState } from "@/app/store/store";


function PaywithBankTransfer() {
  const [pendingMode, setPendingMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [successScreen, setSuccessScreen] = useState<boolean>(false);
  const [bankAccount, setBankAccount] = useState<boolean>(true);

  const VA_Response: va_responseItem | null = useSelector((state: RootState) => state?.VA_Response.items);


  const router = useRouter(); 
  useEffect(() => {
    if (router) {
      console.log("Router is mounted");
    }
  }, [router]);

  const navigateBack =()=>{
  dispatch(clearResponse())
    router.push("../")
  }

  const dispatch = useDispatch()
  const ConfirmationPage = () => {
    setBankAccount(false)
    setPendingMode(true);
     const TRANSID = VA_Response?.transactionId;
     if (TRANSID) {
    
        BankTransferAPIs.ConfirmTransfer({ transactionId: TRANSID })
          .then((res: any) => {
            console.log(res)
            setLoading(false);
            if (res.message === "Success") {
                  setPendingMode(false);
              
              setSuccessScreen(true);
            }
          })
          .catch(() => {
            setLoading(false);
          });
     
    }

  };

  return (
    <>
      <div className="shadow-lg p-4 space-y-3 w-full bg-white">

        {bankAccount &&  (
          <div className="mx-auto text-center leading-4">
            <p className="pt-6">
              Kindly make your Transfer of <strong>N{VA_Response?.amount}</strong> to this Account{" "}
            </p>
            {/* businessName */}
            {!VA_Response?.virtualBankAccountNumber ? (
              <div className="pt-6">
                <CircularProgress size="20px" color="inherit" />
              </div>
            ) : (
              <div className="shadow-md m-6 p-4 space-y-2">
                <p className="text-lg pt-6 font-bold">Blaqkly</p>
                {/* Account Number */}
                <p className="text-2xl font-bold">
                  {VA_Response?.virtualBankAccountNumber}
                </p>
                {/* Bank */}
                <p className="text-base font-light">Wema Bank</p>

                <div className="text-center flex justify-center">
                  <button
                    onClick={() => ConfirmationPage()}
                    className="bg-secondary flex gap-4 px-6 py-3 rounded-md bg-blue-600  text-white border-blue-400 text-lightBrown"
                  >
                    I have Transferred
                  </button>
                </div>

                <p className=" pt-6 space-y-4 italic text-xs font-bold">
                  Kindly transfer the exact amount to the account number
                  provided. <br className="pt-2" />
                  This account is valid for a single transaction and will remain
                  active for the next 30 minutes
                </p>
              </div>
            )}
          </div>
        )}
        {pendingMode && (
          <div className="mx-auto text-center m-24 space-y-4 leading-4">
            <p className="text-lg font-bold">Transaction in Progress</p>
            {/* Account Number */}

            <div className="px-6">
              <LinearProgress />
            </div>

            {/* <p className="text-md font-medium">
              Click below to confirm transaction status
            </p> */}
            {/* Bank */}
            {/* <div className="text-center flex justify-center">
              <LoadingButton
                text="I have Transferred"
                onClick={confirmPayment}
                loading={loading}
              />
            </div> */}
          </div>
        )}
      {successScreen && (
        <div className="flex items-center justify-center bg-red-700">
 <div className="space-y-4 text-center flex justify-center">
          <p className="text-lg font-bold">Transaction Successful</p>
          <Image src={verify} alt="verify" width={100} height={100} />
          <div className="text-center flex justify-center">
                  <button
                    onClick={() => navigateBack()}
                    className=" flex gap-4 px-4 py-2 rounded-md bg-[#fff4a3]  text-[#272934]"
                  >
Close                  </button>
                </div>

        </div>
        </div>
       
      )}
       </div>
    </>
  );
}

export default PaywithBankTransfer;
