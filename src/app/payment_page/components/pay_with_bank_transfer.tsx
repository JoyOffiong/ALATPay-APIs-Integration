"use client";

import React, { useEffect, useState } from "react";
import LoadingButton from "@/components/loadingbutton";
import { CircularProgress, LinearProgress } from "@mui/material";
import { BankTransferAPIs } from "@/app/services/bankTransfer";
import verify from "../../../images/verify.png";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  VA_Response: {
    virtualBankAccountNumber?: string;
    transactionId: string;
  };
}
function PaywithBankTransfer({ VA_Response }: Props) {
  const [pendingMode, setPendingMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [successScreen, setSuccessScreen] = useState<boolean>(false);

  localStorage.setItem(
    "transactionID",
    JSON.stringify(VA_Response.transactionId)
  );
  const router = useRouter(); 
  useEffect(() => {
    if (router) {
      console.log("Router is mounted");
    }
  }, [router]);
  const navigateBack =()=>{
    router.push("../")
  }

  const ConfirmationPage = () => {
    setPendingMode(true);
  };

  const confirmPayment = () => {
    setLoading(true);
    const TRANSID = JSON.parse(localStorage.getItem("transactionID") || "[]");
    console.log(TRANSID);
    setLoading(true);
    if (TRANSID) {
      setTimeout(() => {
        BankTransferAPIs.ConfirmTransfer({ transactionId: TRANSID })
          .then((res: any) => {
            setLoading(false);
            if (res.message === "Success") {
              setSuccessScreen(true);
            }
          })
          .catch(() => {
            setLoading(false);
          });
      }, 5000);
    }
  };

  return (
    <>
      <div className="shadow-lg p-4 space-y-3 w-full bg-white">
        {pendingMode === false && successScreen === false ? (
          <div className="mx-auto text-center leading-4">
            <p className="pt-6">
              Kindly make your Transfer of <strong>N100</strong> to this Account{" "}
            </p>
            {/* businessName */}
            {!VA_Response.virtualBankAccountNumber ? (
              <div className="pt-6">
                <CircularProgress size="20px" color="inherit" />
              </div>
            ) : (
              <div className="shadow-md m-6 p-4 space-y-2">
                <p className="text-lg pt-6 font-bold">Blaqkly</p>
                {/* Account Number */}
                <p className="text-2xl font-bold">
                  {VA_Response.virtualBankAccountNumber}
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
        ) : (
          <div className="mx-auto text-center m-24 space-y-4 leading-4">
            <p className="text-lg font-bold">Transaction in Progress</p>
            {/* Account Number */}

            <div className="px-6">
              <LinearProgress />
            </div>

            <p className="text-md font-medium">
              Click below to confirm transaction status
            </p>
            {/* Bank */}
            <div className="text-center flex justify-center">
              <LoadingButton
                text="I have Transferred"
                onClick={confirmPayment}
                loading={loading}
              />
            </div>
          </div>
        )}
      </div>
      {successScreen && (
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
    </>
  );
}

export default PaywithBankTransfer;
