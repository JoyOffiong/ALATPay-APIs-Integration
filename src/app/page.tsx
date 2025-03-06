"use client";

import React, { useState, useEffect } from "react";
import Customer_Details from "./beachParty/payment";
import RHS from "./beachParty/RHS";

interface T {
  id: string;
  title: string;
  amount: string;
  source: string;
}
function App() {

  return (

      <div className="overflow-y-0 bg-white flex flex-col-reverse font-inter md:flex-row">
        <div className="w-full md:w-1/2"><Customer_Details/></div>

<div className="w-full md:w-1/2"><RHS/></div>

        </div>

  );
}

export default App;
