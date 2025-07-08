"use client"

import { Modal, Box, Button } from '@mui/material';
import style from "./style";
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import InputBoxComp from './inputField';
import LoadingButton from './loadingbutton';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from "next/navigation";
import { addCustomer } from '@/app/store/customerSlice';
import { useDispatch } from 'react-redux';

type Props = {
    handleCloseCustomerModal: () => void;
    openCustomerModal: boolean; 
  };

  interface ICustomer {
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    metadata: string,
  }

function CustomerInfo({handleCloseCustomerModal, openCustomerModal}:Props) {

  const notify = () => {
    toast("Customer information received");
  };
const {control, handleSubmit} = useForm({mode:"onChange"})
const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch()

const router = useRouter()
const submit=(data:any)=>{

    setLoading(true)

  dispatch(addCustomer(data))  
    notify();
               router.push("/payment_page");

    
    setTimeout(() => {
      handleCloseCustomerModal()
    }, 2000);

}

  return (
    <div>
    <Modal
      open={openCustomerModal}
      onClose={handleCloseCustomerModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p className="text-secondary font-semibold mb-10">
        Enter your Information
        </p>

        <form onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col gap-6">
          <div>
              <InputBoxComp
                name="firstName"
                control={control}
                type="text"
                label="First Name"
              />
            </div>
            <div>
              <InputBoxComp
                name="lastName"
                control={control}
                type="text"
                label="Last Name"
              />
            </div>
            <div>
              <InputBoxComp
                name="email"
                control={control}
                type="text"
                label="Email Address"
              />
            </div>
            <div>
              <InputBoxComp
                name="phone"
                control={control}
                type="text"
                label="Phone Number"
              />
            </div>
              <div>
              <InputBoxComp
                name="amount"
                control={control}
                type="number"
                label="Amount"
              />
            </div>
            <div className="flex flex-end justify-end">
              <LoadingButton text="Submit" loading={loading}/>
             </div>
          </div>
        </form>
      </Box>
    </Modal>
    <ToastContainer />

  </div>
  )
}

export default CustomerInfo
