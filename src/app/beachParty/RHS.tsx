import React from "react";
import star from "../../../src/images/star.png";
import beachBg from "../../../src/images/beach-picture-bg.png";
import Image from "next/image";

function RHS() {
  return (
    <div className="bg-[#FFF5D2] p-4 md:p-16">
      <div className="flex md:flex-col md:gap-5 flex-row">
        <div className="space-y-4 md:w-full w-8/12 ">
          <div className="flex flex-row gap-3">
            <Image src={star} width={24} height={24} alt="beach_party_logo" className="object-contain"/>
            <p className="text-[#292524] md:text-xl text-sm font-schoolbell">
              Beach_terhousesport Festival
            </p>
          </div>
          <div className="space-y-4">
            <p className="font-bold md:leading-[50px] text-[20px] md:text-[40px]  text-[#292524]">
              Women&apos;s-Only Sports Festival Atmosphere{" "}
            </p>
            <div className="text-[#57534E] font-normal text-[10px] md:text-base">
              <p>Date: 8th March 2025</p>
              <p>Location: 234 Loft Resort, Elegushi Beach, Lagos</p>
            </div>
          </div>
        </div>
        <div className="md:w-full w-8/12">
          <Image
            alt="beach-Bg"
            src={beachBg}
            width={100}
            height={100}
            className="md:w-[452px] md:h-[481px] h-[255px] w-[159px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default RHS;
