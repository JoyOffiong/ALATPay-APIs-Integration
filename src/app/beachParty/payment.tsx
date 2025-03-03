"use client";

import InputBoxComp from "@/components/inputField";
import SelectBoxComp from "@/components/selectBoxComp";
import style from "@/components/style";
import { Modal, Box } from "@mui/material";
import { Currency } from "lucide-react";
import React, { useEffect, useState } from "react";
import { metadata } from "../layout";
import img from "../../../src/images/beachParty.png";
import alatpaylogo from "../../../src/images/alatLogo.png";
import Image from "next/image";
import { encode } from "punycode";
import { register } from "module";

function Customer_Details() {
  const [alatPayInitialized, setAlatPayInitialized] = useState(false);
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

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
    { value: 13000, label: "Single Ticket - ₦13,000" },
  ];

  const colors =[
    {value:"Blue house", label:"Blue House"},
    {value:"Red house", label:"Red House"}
  ]

 



  const submit = (e: any) => {

    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const config = {
      apiKey: "af578298aec04578beb7f9b70828ad70",
businessId: "1ada836e-ba62-4146-db8b-08dd4ac0a01c",
      email: data?.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      amount: +data.amount,
      currency: data.currency,
      metadata: data.metaData || "",
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
      body: new URLSearchParams({ "form-name": "contact", ...data }).toString(),
    });
  };



  return (
    <div className="relative w-full p-8 md:p-12 space-y-5">
      <div className="top-4 font-light items-center gap-1 text-xs absolute right-4 flex">
        <em>Powered by</em>
        <Image src={alatpaylogo} width={25} height={25} alt="alatpay logo" />
      </div>
      <div className="flex gap-3 flex-row items-center">
        <Image src={img} width={24} height={24} alt="beach_party_logo" />
        <p className="md:text-base text-sm font-semibold bg-gradient-to-r from-[#022876] to-[#EFAB04] bg-clip-text text-transparent">
          Beach_terhousesport Festival
        </p>
      </div>
      <form name="contact" onSubmit={submit} data-netlify="true">
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="w-full">
              <label className="text-[#57534E] font-normal text-xs">First Name</label>
              <div className="border border-gray-300 p-3 rounded-xl">
                <input name="firstName" type="text" placeholder="First Name" required className="w-full focus:outline-none" />
              </div>
            </div>
            <div className="w-full">
              <label className="text-[#57534E] font-normal text-xs">Last Name</label>
              <div className="border border-gray-300 p-3 rounded-xl">
                <input name="lastName" type="text" placeholder="Last Name" required className="w-full focus:outline-none" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <label className="text-[#57534E] font-normal text-xs">Email Address</label>
            <div className="border border-gray-300 p-3 rounded-xl">
              <input name="email" type="email" placeholder="Email Address" required className="w-full focus:outline-none" />
            </div>
          </div>
          <div className="w-full">
            <label className="text-[#57534E] font-normal text-xs">Phone Number</label>
            <div className="border border-gray-300 p-3 rounded-xl">
              <input name="phone" type="tel" placeholder="Phone Number" required className="w-full focus:outline-none" />
            </div>
          </div>
          <div className="w-full">
            <label className="text-[#57534E] font-normal text-xs">Ticket Package</label>
            <div className="border border-gray-300 p-3 rounded-xl">
              <select name="amount" className="w-full focus:outline-none">
                {payments.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <label className="text-[#57534E] font-normal text-xs">Color</label>
            <div className="border border-gray-300 p-3 rounded-xl">
              <select name="color" required className="w-full focus:outline-none">
                {colors.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>
          <input type="hidden" name="currency" value="NGN" />
        </div>
        <div className="my-16 flex justify-end">
          <button className="w-[203px] h-[48px] min-w-32 py-2 px-6 text-base font-medium rounded-lg text-white bg-gradient-to-r from-[#EFAB04] to-[#022876] hover:opacity-90 transition-opacity" type="submit">
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default Customer_Details;
