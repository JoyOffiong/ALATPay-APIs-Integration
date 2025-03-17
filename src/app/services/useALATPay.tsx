"use client"

import InputBoxComp from '@/components/inputField'
import style from '@/components/style'
import { Modal, Box } from '@mui/material'
import { Currency } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

type props= {
    openModal: boolean;
    handleCloseModal: ()=>void;

}

function UseALATPay({openModal, handleCloseModal}:props) {

    const [alatPayInitialized, setAlatPayInitialized] = useState(false);
    const [popup, setPopup] = useState<any>(null);
    const [formDetails, setFormDetails] = useState({})
 
    useEffect(() => {
      if (typeof window !== "undefined" && !window.Alatpay) {
        const script = document.createElement("script");
        script.src = "https://alatpay-client.azurewebsites.net/js/alatpay.js";
        script.async = true;
    
        script.onload = () => {
          console.log("AlatPay script loaded.");
          setAlatPayInitialized(false); // Ensure state consistency
        };
    
        script.onerror = () => {
          console.error("Failed to load AlatPay script.");
        };
    
        document.body.appendChild(script);
      }
    }, [alatPayInitialized]);
    
    const submit = (formData: any) => {
      if (!window.Alatpay) {
        setAlatPayInitialized(true);
        setTimeout(() => submit(formData), 1000); // Retry after 1 second
        return;
      }
    
      const config = {
        apiKey: "643743e017b24ffe8bc91238bdf6a89a",
        businessId: "1e36f623-a60f-4338-1093-08dc48d3aba4",
        email: formData.email,
        phone: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName,
        amount: +formData.amount,
        currency: formData.currency,
        metadata: formData.metaData || "",
        onTransaction: function (response: any) {
          console.log("Transaction successful: ", response);
        },
        onClose: function () {
          console.log("Payment gateway is closed.");
        },
      };
    
      const newPopup = window.Alatpay.setup(config);
      console.log("Popup initialized:", newPopup);
      newPopup.show();
    };
    
    


 
const {control, handleSubmit, getValues} = useForm({mode:"onChange"})



  return (
    <div>
          <Modal
      open={openModal}
      onClose={handleCloseModal}
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
            <div className='hidden'>
              <InputBoxComp
                name="metaData"
                control={control}
                type="text"
                label="Meta Data"
              />
            </div>
            <div>
              
              <InputBoxComp
                name="currency"
                control={control}
                type="text"
                label="Currency"
              />
            </div>
            <div>
              <InputBoxComp
                name="amount"
                control={control}
                type="text"
                label="Amount"
              />
            </div>
            <div className='hidden'>
              <InputBoxComp
                name="businessId"
                defaultValue="a9e640c0-4ce5-4291-27ca-08dcd31fac98"
                control={control}
                type="text"
                label="Amount"
              />
            </div>
            <div className='hidden'>
              <InputBoxComp
                name="apiKey"
                defaultValue="18eff8dbdb364520a4b7bd6a21db7da7"
                control={control}
                type="text"
                label="Amount"
              />
            </div>
            <div className="flex flex-end justify-end">
<button type='submit'>Pay</button>             </div>
          </div>
       
      </form>
      </Box>
      </Modal>
    </div>
  )
}

export default UseALATPay
