"use client";

import AddTasks from "@/components/AddTaskModal";
import Header from "@/components/header";
import TableComponent from "@/components/tableComponent";
import { Button } from "@mui/material";
import Image from "next/image";
import wallet from "../images/wallet.webp";
import React, { useState, useEffect } from "react";
import CustomerInfo from "@/components/customerInfo";
import { useRouter } from "next/navigation";
import UseALATPay from "./services/useALATPay";
import { Bold } from "lucide-react";
import { StatusItem } from "./store/ConfirmStatus";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

interface T {
  id: string;
  title: string;
  amount: string;
  source: string;
}
function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [openCustomerModal, setOpenCustomerModal] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [rows, setRows] = useState<Array<T>>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [tasks, setTasks] = useState<T>();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const Tableheadings = [
    { label: "S/N" },
    { label: "Task" },
    { label: "time" },
    { label: "Status" },
    { label: "Action" },
  ];

const status : StatusItem | null =  useSelector((state:RootState)=>state.status.items) || null;


console.log(status)
  useEffect(() => {
    const info: T[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    setRows(info);
    setRefetch(false);
  }, [refetch]);

  // const handleClose = () => {
  //   setOpen(false);
  //   setUpdate(false);
  //   setTasks({});
  // };
  const router = useRouter();

  const handleCloseCustomerModal = () => {
    setOpenCustomerModal(false);

    router.push("../payment_page");
  };

  const handleOpenModal = () => {
    setOpenCustomerModal(true);
  };

  // const fetchItemById = (id: string) => {
  //   setUpdate(true)
  //   setOpen(true);
  //   const item = rows.find((row) => row.id === id);
  //   if (item) {
  //     setTasks(item);
  //   } else {
  //     setTasks({});
  //   }
  // };

  const deleteItem = (id: string) => {
    const item = rows.findIndex((row) => row.id === id);
    rows.splice(item, 1);
    localStorage.setItem("tasks", JSON.stringify(rows));
    setRefetch(true);
  };

  return (
    <div className="flex min-h-screen gap-4 mt-20 gap-y-8 p-4 flex-col items-center w-full">
      <Header />

      <div className="rounded-lg  flex flex-col md:flex-row items-center gap-4 bg-[#e79b59] justify-between shadow-md p-6 w-full ">
        <div className="space-y-4 ">
          <p className="text-secondary text-4xl font-semibold">My Wallet</p>
          <p>Balance: <em className="font-bold">₦ 100</em></p>
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

      <div className="flex flex-col-reverse w-full gap-4 items-center justify-start md:justify-between md:flex-row ">
        <p className="text-2xl font-semibold text-secondary">Inflows</p>

        {/* <Button
          sx={{ backgroundColor: "#272934", color: "#fff4a3" }}
          onClick={() => setOpen(true)}
        >
          Add Tasks
        </Button> */}

        <div className="flex flex-col gap-4">
 <Button
          sx={{
            backgroundColor: "#272934",
            color: "#fff4a3",
            "&:hover": {
              color: "#272934",
              backgroundColor: "#fff4a3",
              fontWeight: "Bold",
            },
          }}
          onClick={() => setOpenModal(true)}
        >
          {" "}
          Fund Wallet via webplugin
        </Button>

        <Button
          sx={{
            backgroundColor: "#272934",
            color: "#fff4a3",
            "&:hover": {
              color: "#272934",
              backgroundColor: "#fff4a3",
              fontWeight: "Bold",
            },
          }}
          onClick={() => handleOpenModal()}
        >
          {" "}
        Fund Wallet via APIs
        </Button>
        </div>
       
      </div>
      {/* <div className="w-full">
        <TableComponent
          Tableheadings={Tableheadings}
          rows={rows}
          setRefetch={setRefetch}
          deleteItem={deleteItem}
          fetchItemById={fetchItemById}
        />
      </div> */}
      {/* <div className="items-right flex flex-col space-y-2 text-center">
      <em>To use our pro version </em> 
       <button onClick={()=>handleOpenModal()}><em className="bg-[#272934] text-[#fff4a3] rounded-md p-2">Pay N100</em></button> 
       
      </div> */}
      {/* {open && ( 
         <AddTasks
        //   open={open}
        //   update={update}
        //   handleClose={handleClose}
        //   setRefetch={setRefetch}
        //   setTasks={setTasks}
        //   tasks={tasks}
        // />
      )}  */}
      {openCustomerModal && (
        <CustomerInfo
          openCustomerModal={openCustomerModal}
          handleCloseCustomerModal={handleCloseCustomerModal}
        />
      )}

      {openModal && (
        <UseALATPay openModal={openModal} handleCloseModal={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
