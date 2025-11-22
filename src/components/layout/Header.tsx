"use client";

import IconButton from "@/components/ui/IconButton";
import SearchInput from "@/components/ui/SearchInput";

import { IoMdNotificationsOutline } from "react-icons/io";

export default function Header() {
  return (
    <div>
      <div className="flex justify-between md:gap-8 items-center">
        <div>
          <h1 className="text-xl text-secondary-dark font-bold w-48">Dashboard</h1>
        </div>

        <div className="hidden md:block flex-grow">
          <SearchInput />
        </div>

        <div className="flex items-center gap-5">
          <div className="relative">
            <IconButton
              altText="Notification"
              size="small"
              className="absolute top-0 left-0"
            >
              <IoMdNotificationsOutline size={36} color="#917F74" />
            </IconButton>
            <div className="absolute top-0 left-0 h-2 w-2 rounded-full bg-primary-base"></div>
          </div>
          <div className="flex gap-5 h-9 items-center">
              <div className="h-9 w-9 rounded-full bg-black"></div>
              <div className="hidden lg:block">
                <p className="font-bold text-secondary-dark">Mish Wilson</p>
                <p className="text-secondary-dark">Writer</p>
              </div>
          </div>
        </div>
      </div>
      <div>
        <p className="text-secondary-dark font-light"><span className="font-bold">Friday,</span> November 7 2025</p>
      </div>
    </div>
  );
}
