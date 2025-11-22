// TODO: Implement Header title change depending on Page
// TODO: Search Input drop down
// TODO: ProfilePicture rendering


"use client";

import IconButton from "@/components/ui/IconButton";
import SearchInput from "@/components/ui/SearchInput";

import { IoMdNotificationsOutline } from "react-icons/io";
import { getHeaderDate } from "@/lib/utils/formatDates"


export default function Header() {

  const headerDate = getHeaderDate();

  return (
    <div>
      <div className="flex justify-between md:gap-8 items-start">
        <div>
          <h1 className="text-xl text-secondary-dark font-bold w-48">Dashboard</h1>
          <p className="text-secondary-dark font-light"><span className="font-bold">{headerDate.day}, </span>{headerDate.date}</p>

        </div>

        <div className="hidden md:block flex-grow">
          <SearchInput />
        </div>

        <div className="flex items-center gap-5">

            <IconButton
              altText="Notification"
              size="small"
              showNotification={true}
            >
              <IoMdNotificationsOutline size={36} color="#917F74" />
            </IconButton>

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
      </div>
    </div>
  );
}
