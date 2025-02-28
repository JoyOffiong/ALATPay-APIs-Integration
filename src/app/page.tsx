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

      <div className="flex flex-col-reverse font-inter md:flex-row">
<Customer_Details/>
<RHS/>
        </div>

  );
}

export default App;
