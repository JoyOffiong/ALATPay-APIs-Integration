"use client";
import React, { useState, useEffect } from "react";
import UseALATPay from "./services/useALATPay";

interface T {
  id: string;
  title: string;
  amount: string;
  source: string;
}
function App() {

   
  return (
     < UseALATPay
          
          />

    
  );
}

export default App;
