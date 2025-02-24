"use client";

import InputBoxComp from "@/components/inputField";
import SelectBoxComp from "@/components/selectBoxComp";
import style from "@/components/style";
import { Modal, Box } from "@mui/material";
import { Currency } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { metadata } from "../layout";

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

  const payments=[
   {value:1000, label:"Level 1 - N1,000"},
   {value:2500 ,label:"Level 2 - N2500"}, 
   {value:5000, label:"Level 3 - N5000"}, {value:10000, label:"Level 4 - 10000"}
  ]

  const location=[
    {value:"nigeria", label:"Nigeria"}, {value:"diaspora", label:"Diaspora"}
  ]
  const localGovt=[
{value:"Ilesa East", label:"Ilesa East"}, 
{value:"Ilesa West", label:"Ilesa West"},
{value:"Atakumosa West", label:"Atakumosa West"},
{value:"Atakumosa East", label:"Atakumosa East"},
{value:"Obokun", label:"Obokun"}, {value:"Oriade", label:"Oriade"}
  ]
const title=[
    {value:"mr", label:"Mr"},
    {value:"mrs", label:"Mrs"},
    {value:"Dr", label:"Dr"},
    {value:"chief", label:"Chief"},
    {value:"oba", label:"Oba"},
    {value:"prof", label:"Prof"}
]

  const submit = (formData: any) => {

// Retrieve and parse existing data, ensuring it's always an array
const users = JSON.parse(localStorage.getItem("customer") ?? "[]");

// Store updated array by spreading existing data and adding new entry
localStorage.setItem(
  "customer",
  JSON.stringify([
    ...(Array.isArray(users) ? users : []), 
    { ...formData, metadata: "" }
  ])
);

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

  const { control, handleSubmit, getValues } = useForm({ mode: "onChange" });

  return (
    <div className="mt-32 mx-20">
      <p className="text-secondary font-semibold mb-10">
        Enter your Information
      </p>
      <form onSubmit={handleSubmit(submit)}>
        <div className="flex mt-0 flex-col gap-10">
            {/* Title and name */}
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="w-full">
                <label htmlFor="">Title</label>
                <SelectBoxComp data={title} name="title" control={control} />

            </div>
            <div className="w-full">
                <label htmlFor="">First Name</label>
              <InputBoxComp
                name="firstName"
                control={control}
                type="text"
                label="First Name"
              />
            </div>
            <div className="w-full">
                <label htmlFor="">Last Name</label>
              <InputBoxComp
                name="lastName"
                control={control}
                type="text"
                label="Last Name"
              />
            </div>
          </div>
          {/* email and phoneNumber */}
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="w-full">
                <label htmlFor="">Other Name</label>
              <InputBoxComp
                name="otherName"
                control={control}
                type="text"
                label="Other Name"
              />
            </div>
            <div className="w-full">
                <label htmlFor="">Email Address</label>
              <InputBoxComp
                name="email"
                control={control}
                type="text"
                label="Email Address"
              />
            </div>
            <div className="w-full">
                <label htmlFor="">Phone Number</label>
              <InputBoxComp
                name="phone"
                control={control}
                type="text"
                label="Phone Number"
              />
            </div>
          </div>

     {/* LGA, TOWN, WARD */}
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="w-full">
                <label htmlFor="">Local Government</label>
            <SelectBoxComp data={localGovt} label="Select your LGA" name="localGovernement" control={control} />
            </div>
            <div className="w-full">
                <label htmlFor="">Town</label>
            <InputBoxComp
            name="town" control={control} type="text" label="Town"/>
            </div>
            <div className="w-full">
                <label htmlFor="">Ward</label>
                <InputBoxComp name="ward" control={control} type="text" label="Ward"/>
            </div>
            <div>

            </div>
          </div>

          {/* beneificiary LGA, Location, class of payment */}

          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="w-full">
            <label htmlFor="">Beneficiary LGA</label>
            <SelectBoxComp data={localGovt} name="beneficiaryLGA" control={control} label="Select your LGA"/>
            </div>
            <div className="w-full">
                <label htmlFor="">Location</label>
                <SelectBoxComp data={location} name="location" control={control} />
            </div>
            <div className="w-full">
                <label htmlFor="">Class of Payment made by Donor</label>
                <SelectBoxComp data={payments} name="amount" control={control} />

            </div>
          </div>

        

          <div className="hidden">
            <InputBoxComp
              name="metaData"
              control={control}
              type="text"
              label="Meta Data"
            />
          </div>
          <div>
          <div className="hidden">
            <InputBoxComp
              name="currency"
              control={control}
              type="text"
              defaultValue="NGN"
              label="Currency"
            />
          </div>
          
                     </div>
          <div className="hidden">
            <InputBoxComp
              name="businessId"
              defaultValue="a9e640c0-4ce5-4291-27ca-08dcd31fac98"
              control={control}
              type="text"
              label="Amount"
            />
          </div>
          <div className="hidden">
            <InputBoxComp
              name="apiKey"
              defaultValue="18eff8dbdb364520a4b7bd6a21db7da7"
              control={control}
              type="text"
              label="Amount"
            />
          </div>
          <div className=" mb-20 flex flex-end justify-end">
            <button className="bg-green-700 text-white py-2 px-4 rounded-lg " type="submit">Pay</button>{" "}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Customer_Details;
