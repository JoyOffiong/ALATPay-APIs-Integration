"use client";

import InputBoxComp from "@/components/inputField";
import SelectBoxComp from "@/components/selectBoxComp";
import style from "@/components/style";
import { Modal, Box } from "@mui/material";
import { Currency } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { metadata } from "../layout";
import img from "../../../src/images/beachParty.png";
import alatpaylogo from "../../../src/images/alatLogo.png";
import Image from "next/image";
import { encode } from "punycode";

function Customer_Details() {
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

  const payments = [
    { value: 15000, label: "Single - ₦15,000" },
    { value: 70000, label: "Group of 5 - ₦70,000" },
  ];

  const colors =[
    {value:"Blue house", label:"Blue House"},
    {value:"Red house", label:"Red House"}
  ]

  const formattedPayments = payments.map((p) => ({
    value: String(p.value),
    label: p.label,
  }));


  const submit = (formData: any) => {
    const config = {
      apiKey: "af578298aec04578beb7f9b70828ad70",
businessId: "1ada836e-ba62-4146-db8b-08dd4ac0a01c",
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
      const newPopup = (window as any).Alatpay.setup(config);
      if (newPopup) {
        console.log("Popup initialized:", newPopup);
        newPopup.show();
      } else {
        console.error("Failed to initialize AlatPay popup.");
      }
    } catch (error) {
      console.error("Error initializing AlatPay:", error);
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })

  };

  const { control, handleSubmit, getValues } = useForm({ mode: "onChange" });

  return (
    <div className="relative  w-full p-8 md:p-12 space-y-5">
      <div className="top-4 font-light items-center gap-1 text-xs absolute right-4 flex ">
        <em >Powered by</em> <Image src={alatpaylogo} width={25} height={25} alt="alatpay logo" />
      </div>
      <div className="flex gap-3 flex-row items-center">
        <Image src={img} width={24} height={24} alt="beach_party_logo" />
        <p className="md:text-base text-sm font-semibold bg-gradient-to-r from-[#022876] to-[#EFAB04] bg-clip-text text-transparent">
          Beach_terhousesport Festival
        </p>
      </div>
      <div className="space-y-4">
        <p className="font-semibold text-xl md:text-2xl text-[#292524]">
          Ticket Payment Form
        </p>
        <p className="text-[#57534E] text-sm md:text-base font-normal">
          Get ready to connect, compete, and have fun in a vibrant, empowering
          atmosphere!
        </p>
      </div>
      <form name="contact" onSubmit={handleSubmit(submit)} data-netlify= "true">
        <div className="flex mt-8 flex-col gap-6">
          {/* Title and name */}
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="w-full">
              <label htmlFor="" className="text-[#57534E] font-normal text-xs">First Name</label>
              <InputBoxComp
                name="firstName"
                control={control}
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="w-full">
              <label htmlFor=""  className="text-[#57534E] font-normal text-xs">Last Name</label>
              <InputBoxComp
                name="lastName"
                control={control}
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="w-full">
            <label htmlFor=""  className="text-[#57534E] font-normal text-xs">Email Address</label>
            <InputBoxComp
              name="email"
              control={control}
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div className="w-full">
            <label htmlFor=""  className="text-[#57534E] font-normal text-xs">Phone Number</label>
            <InputBoxComp
              name="phone"
              control={control}
              type="text"
              placeholder="Phone Number"
            />
          </div>

          <div className="w-full">
            <label htmlFor=""  className="text-[#57534E] font-normal text-xs">Ticket Package</label>
            <SelectBoxComp
              data={formattedPayments}
              name="amount"
              placeholder="Select Ticket Package"
              control={control}
            />
          </div>

          <div>
          <label htmlFor=""  className="text-[#57534E] font-normal text-xs">Color</label>
              <SelectBoxComp data={colors} name="colors" placeholder="Select your house" control={control}/>
          </div>

          <div className="hidden">
            <label htmlFor="">Currency</label>
            <input
              name="currency"
              type="text"
              defaultValue="NGN"
            />
          </div>
        </div>
       
        <div className="my-16 flex justify-end">
          <button
            className="w-[203px] h-[48px] min-w-32 py-2 px-6 text-base font-medium rounded-lg text-white 
               bg-gradient-to-r from-[#EFAB04] to-[#022876] hover:opacity-90 transition-opacity"
            type="submit"
          >
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default Customer_Details;
