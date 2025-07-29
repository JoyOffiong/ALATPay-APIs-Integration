" use client"

import { Button } from "@mui/material";
import { Menu, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toDo from "../images/to-do-list.png"
import { useRouter } from "next/router";




export default function Header() {

     
  return (
    <div
      className={`px-20 py-4 bg-white fixed mb-80 w-full mr-0 top-0 z-20 shadow-md flex items-center`}
    >
      <div className="flex flex-row items-center  w-full justify-between ">
        <div className=" flex gap-2 items-center">
<Wallet strokeWidth={2.75} absoluteStrokeWidth />          <em >MyWallet</em>
        </div>
        
       
      </div>
    </div>
  );
}
