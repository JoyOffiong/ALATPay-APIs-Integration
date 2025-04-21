import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import style from './style'
import { Box, MenuItem } from '@mui/material'
import InputBoxComp from './inputfield'

function Form() {
    const {control, handleSubmit, getValues} = useForm({mode:"onChange"})
    const values= getValues()
   
    const submit=()=>{
     alatpay.submit(values)
    }

      console.log(values)

      const alatpay= UseALATPay({
      amount: +values.amount,
      apiKey: "14feff9729184eb09e0385184efc1816", 
      businessId: "582418f7-032f-48ca-27c8-08dcd31fac98", 
      currency: values.curency,
      email: values.email, 
      firstName:values.firstName,
      lastName:values.firstName, 
      metadata:values.metadata,   
      phone:values.phone
    })
     console.log(values)

  return (
    <div>
          
    <Box sx={style}>
      <p className="text-secondary font-semibold mb-10">
      Enter your Information
      </p>
    <form onSubmit={handleSubmit}>
      
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
              name="metadata"
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
              defaultValue="95eaac56-5627-45a0-285b-08dcfa9cf102"
              control={control}
              type="text"
              label="Amount"
            />
          </div>
          <div className='hidden'>
            <InputBoxComp
              name="apiKey"
              defaultValue="2e4b79a31781416a813b919fa4ee3922"
              control={control}
              type="text"
              label="Amount"
            />
          </div>
          </div>

         
  <button type="submit" 
  className='mt-6 border-[1px] border-slate-500 bg-[#e8f0fe] text-red-950 font-bold flex justify-end items-end rounded-md py-2 px-8'
  >Pay</button>

     
    </form>
    </Box>
  </div>
  )
}

export default Form
