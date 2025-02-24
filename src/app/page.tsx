"use client";

import AddTasks from "@/components/AddTaskModal";
import Header from "@/components/header";
import TableComponent from "@/components/tableComponent";
import { Button } from "@mui/material";
import Image from "next/image";
import wallet from "../images/wallet.jpg";
import React, { useState, useEffect } from "react";
import CustomerInfo from "@/components/customerInfo";
import { useRouter } from "next/navigation";
import FeeWaiver from "./models/FeeWaiver";
import Link from "next/link";
import { FetchBalance } from "./services/accountBalanceLookup";

interface T {
  id: string;
  title: string;
  amount: string;
  source: string;
}
function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [openCustomerModal, setOpenCustomerModal] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>();
  const [show, setShow] = useState<boolean>(true)


  const [openModal,  setOpenModal] = useState<boolean>(false)
  const router = useRouter(); 
  useEffect(() => {

    FetchBalance().then((res)=>{
      console.log(res)
    })
    if (router) {
      console.log("Router is mounted");
    }
  }, [router]);


    const handleCloseCustomerModal=()=>{
      setOpenCustomerModal(false)
          
      router.push("../payment_page");
    }

    const handleOpenModal=()=>{
      setOpenCustomerModal(true)
    }


  

  return (

    <div>

    <div className="flex min-h-screen gap-4 mt-20 gap-y-8 p-4 flex-col items-center w-full">
      <Header />

      
      <div className="rounded-lg  flex flex-col md:flex-row items-center gap-4 bg-[#949491] justify-between shadow-md p-6 w-full ">
        <div className="space-y-3 text-center md:text-left ">
          <p className="text-secondary text-2xl font-semibold">Wallet Balance:</p>
          <em className="text-secondary  text-2xl font-semibold">{balance}</em>
        </div>

        <div className="w-1/2 justify-center flex ">
          <Image
            src={wallet}
            alt="tasks image"
            height={250}
            width={250}
            className="rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col space-y-4 w-full items-center justify-start md:justify-between md:flex-row ">
        <p className="text-2xl font-semibold text-secondary">Transaction History</p>

<div className=" flex flex-col md:flex-row gap-4 justify-between">

  <div>
    <Link href="../customer_details">
  <Button
          sx={{ backgroundColor: "#272934", color: "#fff4a3" }}
         // onClick={() => setOpenModal(true)}
        > 
        Register Here
        </Button>
        </Link>

  </div>

       
</div>
        
      </div>
      <div className="w-full">
        <TableComponent
                  />
      </div>
      <div className="items-right flex flex-col space-y-2 text-center">
      <em>To use our pro version </em> 
       <button onClick={()=>handleOpenModal()}><em className="bg-[#272934] text-[#fff4a3] rounded-md p-2">Fund Wallet Via API</em></button> 
       
      </div>

       {openCustomerModal && (
       <CustomerInfo
       openCustomerModal={openCustomerModal}
       handleCloseCustomerModal={handleCloseCustomerModal}  
       />
     )}

         </div>

        </div>

  );
}

export default App;
