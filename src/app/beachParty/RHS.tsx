import React from "react";
import star from "../../../src/images/star.png";
import makanabg from "../../../src/images/makanaTickets.jpg";
import Image from "next/image";

function RHS() {
  return (
    <div className="bg-[#FFF5D2] w-full p-4 md:px-16 pt-16 ">
      <div className="flex md:flex-col items-center md:gap-5 flex-row">
        <div className="space-y-4 md:w-full w-8/12 ">
          <div className="flex flex-row gap-3">
            <Image src={star} width={24} height={24} alt="beach_party_logo" className="object-contain"/>
            <p className="text-[#292524] md:text-xl text-sm">
              Makana Still Standing
            </p>
          </div>
          <div className="space-y-4">
            <p className="font-bold md:leading-[50px] text-[20px] md:text-[40px]  text-[#292524]">
              Makana Tickets
            </p>
            <div className="text-[#57534E] font-normal text-[10px] md:text-base">
              <p>Date: 12th October 2025</p>
              <p>Location: Terra Kulture, VIctoria Island, Lagos</p>
            </div>
          </div>
        </div>
        <div className="md:w-full w-8/12">
          <Image
            alt="beach-Bg"
            src={makanabg}
            width={500}
            height={300}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default RHS;
