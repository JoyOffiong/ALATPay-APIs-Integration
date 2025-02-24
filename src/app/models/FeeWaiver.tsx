import { Modal } from "@mui/material";
import { FaCheckSquare } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import Image from "next/image";
import box from "../models/box.png";
import floweryBG from "../models/flowerybg.png";

type Props = {
  open: boolean;
  setOpen: (arg0: boolean) => void;
};

export default function FeeWaiver({ open, setOpen }: Props) {
  function closeModal() {
    setOpen(false);
  }

  return (
 <Modal open={open} onClose={closeModal}>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">

      <div className="absolute sm:w-4/5 max-w-[590px] min-h-[520px] bg-[#7b766d] opacity-50 shadow-lg z-10"></div>
  
      <div className="absolute bg-white space-y-6 h-auto z-20 p-4 sm:p-6 shadow-lg w-11/12 sm:w-4/5 max-w-[550px] mx-auto">
      <Image
        src={floweryBG}
        alt="flowerBg"
        className="absolute w-full h-full object-cover z-0"/>
        
        <div className="flex justify-end">
          <AiFillCloseSquare
            size={28}
            className="cursor-pointer text-[#A90836]"
            onClick={closeModal}
          />
        </div>
  
        <div className="flex justify-center">
          <Image src={box} width={77} height={73} alt="gift box" />
        </div>
  
        <h2 className="text-2xl sm:text-3xl text-center font-bold px-4">
          Limited Time Offer: 3 Month Fee Waiver!
        </h2>
  
        <div className="flex flex-col sm:flex-row justify-between text-xs w-11/12 mx-auto font-bold mt-4 gap-2">
          <div className="flex gap-x-1 items-center">
            <FaCheckSquare className="text-green-600" />
            No setup fees
          </div>
          <div className="flex gap-x-1 items-center">
            <FaCheckSquare className="text-green-600" />
            No transaction charges
          </div>
          <div className="flex gap-x-1 items-center">
            <FaCheckSquare className="text-green-600" />
            Fast & Secure Payments
          </div>
        </div>
  
        <p className="mt-4 text-center text-sm sm:text-base font-semibold">
          Offer valid for a limited time! For Businesses Registered on ALATPay only.
        </p>
  
        <div className="text-center mt-6 py-2 rounded-lg w-3/5 mx-auto bg-[#A90836]">
          <button className="inline-block w-full">
            <a
              href="https://alatpay.ng/merchant-signup"
              className="inline-block w-full font-extrabold text-sm sm:text-base text-white rounded"
            >
              Get Started Now
            </a>
          </button>
        </div>
      </div>
    </div>
  </Modal>
  
  );
}
