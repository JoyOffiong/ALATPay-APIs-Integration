"use client";

import InputBoxComp from "@/components/inputField";
import SelectBoxComp from "@/components/selectBoxComp";

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
    { value: 15000, label: "Regular - ₦15,000" },
    { value: 50000, label: "VIP - ₦50,000" },
    { value: 500000, label: "Circle of 5 - ₦500,000" },
    { value: 1000000, label: "Platinum - ₦1,000,000" },
  ];



  const formattedPayments = payments.map((p) => ({
    value: String(p.value),
    label: p.label,
  }));

  const submit = (formData: any) => {
 
    const formDatas = new URLSearchParams();
    formDatas.append("entry.1311444054", formData.firstName); 
    formDatas.append("entry.423445294", formData.lastName);  
    formDatas.append("entry.145421949", formData.email);     
    formDatas.append("entry.1751212579", formData.phone);     
    formDatas.append("entry.410223908", formData.amount);     
    formDatas.append("entry.2023934774", formData.colors);     

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSdpmc5C0atledFL5jI5Td8S5YyJKGmi5lABH7rWvd0vMLLqng/formResponse", {
      method: "POST",
      body: formDatas,
      mode: "no-cors", 
      headers: { "Content-Type": "application/x-www-form-urlencoded" },

    })
      .then((res) =>  res )
      .catch((error) => error);

    const config = {
      apiKey: "f8fddaad2dc249a0a12d9e0ba7ba5376",
      businessId: "582418f7-032f-48ca-27c8-08dcd31fac98",
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

 
  };

  const { control, handleSubmit, getValues } = useForm({ mode: "onChange" });

  return (
    <div className="relative  w-full p-8 md:p-12 space-y-5">
      <div className="top-4 font-light items-center gap-1 text-xs absolute right-4 flex ">
        <em>Powered by</em>{" "}
        <Image src={alatpaylogo} width={25} height={25} alt="alatpay logo" />
      </div>
      <div className="flex gap-3 flex-row items-center">
        <Image src={img} width={24} height={24} alt="beach_party_logo" />
        <p className="md:text-base text-sm font-semibold bg-gradient-to-r from-[#022876] to-[#EFAB04] bg-clip-text text-transparent">
          Makana Still Standing
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
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex mt-8 flex-col gap-6">
          {/* Title and name */}
          <div className="flex flex-col md:flex-row gap-6 w-full">
            <div className="w-full">
              <label htmlFor="" className="text-[#57534E] font-normal text-xs">
                First Name
              </label>
              <InputBoxComp
                name="firstName"
                control={control}
                type="text"
                placeholder="First Name"
              />
            </div>
            <div className="w-full">
              <label htmlFor="" className="text-[#57534E] font-normal text-xs">
                Last Name
              </label>
              <InputBoxComp
                name="lastName"
                control={control}
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="" className="text-[#57534E] font-normal text-xs">
              Email Address
            </label>
            <InputBoxComp
              name="email"
              control={control}
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div className="w-full">
            <label htmlFor="" className="text-[#57534E] font-normal text-xs">
              Phone Number
            </label>
            <InputBoxComp
              name="phone"
              control={control}
              type="text"
              placeholder="Phone Number"
            />
          </div>

          <div className="w-full">
            <label htmlFor="" className="text-[#57534E] font-normal text-xs">
              Ticket Package
            </label>
            <SelectBoxComp
              data={formattedPayments}
              name="amount"
              placeholder="Select Ticket Package"
              control={control}
            />
          </div>

          

          <div className="hidden">
            <label htmlFor="">Currency</label>
            <input name="currency" type="text" defaultValue="NGN" />
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
