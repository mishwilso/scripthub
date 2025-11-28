// TODO: Implement Header title change depending on Page
// TODO: fix with proper database queries

"use client";

import IconButton from "@/components/ui/IconButton";
import SearchInput from "@/components/ui/SearchInput";
import Avatar from "@/components/ui/Avatar";

import { useAuth } from "@/context/AuthContext";

import Badge from "@/components/ui/Badge";
import Notification from "@/components/ui/Notification";
import Dropdown from "@/components/ui/Dropdown";

import { useRouter } from "next/navigation";
import { FaComment, FaAt } from "react-icons/fa";

import { IoMdNotificationsOutline } from "react-icons/io";
import { getHeaderDate } from "@/lib/utils/formatDates";
import { capitalizeFirstLetter } from "@/lib/utils/formatString";

import { MdOutlineMarkChatRead } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";


export default function Header() {
  const headerDate = getHeaderDate();
  const { user } = useAuth();

  console.log(user);

  const pathname = usePathname();

  const getHeaderTitle = () => {
    if (pathname === '/dashboard') {
      return 'Dashboard';
    } else if (pathname === '/books') {
      return 'My Works';
    } else {
      return 'New Page';
    }
  };

  const headerTitle = getHeaderTitle();



  const userName = capitalizeFirstLetter(user?.user_metadata.name);

  return (
    <div>
      <div className="flex justify-between md:gap-8 items-start ">
        <div>
          <h1 className="text-xl text-secondary-dark font-bold w-48">
            {headerTitle}
          </h1>
          <p className="text-secondary-dark font-light">
            <span className="font-bold">{headerDate.day}, </span>
            {headerDate.date}
          </p>
        </div>

        <div className="hidden md:block flex-grow md:my-auto">
          <SearchInput />
        </div>

        <div className="flex items-center gap-5 md:my-auto">
          <NotificationDropdown />
          <ProfileDropdown username={userName} />
        </div>
      </div>
      <div></div>
    </div>
  );
}

function NotificationDropdown() {
  const hasUnread = true;

  const markAllRead = () => {
    console.log("Marking all as read");
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked");
  };

  return (
    <Dropdown>
      <Dropdown.Button>
        <IconButton
          showNotification={hasUnread}
          altText="notfication"
          size="small"
          inert={true}
        >
          <IoMdNotificationsOutline size={24} color="#7E7065" />
        </IconButton>
      </Dropdown.Button>

      <Dropdown.Menu size="w-96">
        <Dropdown.Header>
          <div className="gap-4 flex">
            <p className="text-secondary-dark">Notifications </p>
            <Badge shape="square">2</Badge>
          </div>
        </Dropdown.Header>

        <Dropdown.Option
          onClick={markAllRead}
          startIcon={<MdOutlineMarkChatRead />}
          danger
        >
          Mark all as read
        </Dropdown.Option>

        <Dropdown.Divider />

        <Notification
          icon={<FaComment size={16} color="#7E7065" />}
          title="New Comment"
          message="Sarah added a comment on chapter 3"
          timestamp="5 minutes ago"
          isRead={false}
          onClick={handleNotificationClick}
        />

        <Notification
          icon={<FaAt size={16} color="#7E7065" />}
          title="You were mentioned"
          message="Alex mentioned you in a note on Chapter 7"
          timestamp="1 hour ago"
          isRead={true}
          onClick={handleNotificationClick}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
}

function ProfileDropdown({ username }: { username: string }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogOut = () => {
    logout();
    router.push("/");
  };

  return (
    <Dropdown>
      <Dropdown.Button>
        <div className="flex gap-4 h-9 items-center px-2 py-6">
          <Avatar />
          <div className="hidden lg:block">
            <p className="font-bold text-secondary-dark">{username}</p>
            <p className="text-secondary-dark text-left">Writer</p>
          </div>
        </div>
      </Dropdown.Button>

      <Dropdown.Menu>
        <Dropdown.Header>
          <div>
            <p className="text-xs text-secondary-dark/80">Signed in as</p>
            <p
              className="text-sm font-semibold text-secondary-dark line-clamp-1 w-48"
              title={user?.email}
            >
              {user?.email}
            </p>
          </div>
        </Dropdown.Header>
        <Dropdown.Divider />
        <Dropdown.Option startIcon={<IoSettingsOutline size={16} />}>
          Settings
        </Dropdown.Option>
        <Dropdown.Option startIcon={<CgProfile size={16} />}>
          My Profile
        </Dropdown.Option>
        <Dropdown.Divider />
        <Dropdown.Option
          startIcon={<TbLogout2 size={16} />}
          onClick={handleLogOut}
          danger
        >
          Log Out
        </Dropdown.Option>
      </Dropdown.Menu>
    </Dropdown>
  );
}
