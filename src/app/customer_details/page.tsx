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

function Customer_Details({openModal, handleCloseModal}:props) {

    const [alatPayInitialized, setAlatPayInitialized] = useState(false);

 
    useEffect(() => {
      if (!alatPayInitialized) {
        const script = document.createElement("script");
        script.src = "https://web.alatpay.ng/js/alatpay.js";
        script.async = true;
    
        script.onload = () => {
          setAlatPayInitialized(true);
        };
    
        script.onerror = () => {
          console.error("Failed to load AlatPay script.");
        };
    
        document.body.appendChild(script);
      }
    }, [alatPayInitialized]);
    
    const submit = (formData: any) => {
      const config = {
        apiKey: "2b11fe4f55244516bcf9040f733eeaef",
        businessId: "95eaac56-5627-45a0-285b-08dcfa9cf102",
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
    
      try {
        const newPopup = window.Alatpay.setup(config);
        if (newPopup) {
          console.log("Popup initialized:", newPopup);
          newPopup.show();
        } else {
          console.error("Failed to initialize AlatPay popup.");
        }
      } catch (error) {
        console.error("Error initializing AlatPay:", error);
      }
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

export default Customer_Details
