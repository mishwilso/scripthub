// TODO: Implement Header title change depending on Page
// TODO: fix with proper database queries

"use client";

import IconButton from "@/components/ui/IconButton";
import SearchInput from "@/components/ui/SearchInput";
import Avatar from "@/components/ui/Avatar";

import { useAuth } from '@/context/AuthContext';


import { IoMdNotificationsOutline } from "react-icons/io";
import { getHeaderDate } from "@/lib/utils/formatDates";
import { capitalizeFirstLetter } from "@/lib/utils/formatString"

export default function Header() {
  const headerDate = getHeaderDate();
  const {user} = useAuth();
  console.log(user)

  const userName = capitalizeFirstLetter(user?.user_metadata.name)

  return (
    <div>
      <div className="flex justify-between md:gap-8 items-start ">
        <div>
          <h1 className="text-xl text-secondary-dark font-bold w-48">
            Dashboard
          </h1>
          <p className="text-secondary-dark font-light">
            <span className="font-bold">{headerDate.day}, </span>
            {headerDate.date}
          </p>
        </div>

        <div className="hidden md:block flex-grow md:my-auto">
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
            <Avatar />
            <div className="hidden lg:block">
              <p className="font-bold text-secondary-dark">{userName}</p>
              <p className="text-secondary-dark">Writer</p>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
