"use client";

import Input from "@/components/ui/Input";
import IconButton from "@/components/ui/IconButton";

import { IoMdNotificationsOutline } from "react-icons/io";

export default function Header() {
  return (
    <div className="flex gap-8">
      <div>
        <h1>Dashboard</h1>
        <p>Friday, November</p>
      </div>

      <div className="flex-1">
        <Input fullWidth/>
      </div>

      <div className="flex items-center gap-5">
        <div className="">
            <IconButton altText="Notification" size="small"> <IoMdNotificationsOutline size={36} color="#917F74"/> </IconButton>
            <div className="relative top-0 h-2 w-2 rounded-full bg-primary-base"></div>
        </div>
        <div className="flex gap-5 h-9 items-center">
            <div className="h-9 w-9 rounded-full bg-black"></div>
            <div>
                <p className="font-bold text-secondary-dark">Mish Wilson</p>
                <p className="text-secondary-dark">Writer</p>
            </div>
        </div>
      </div>
    </div>
  );
}
