// TODO: Implement Header title change depending on Page
// TODO: fix with proper database queries

"use client";

import IconButton from "@/components/ui/IconButton";
import SearchInput from "@/components/ui/SearchInput";
import Avatar from "@/components/ui/Avatar";

import { useAuth } from '@/context/AuthContext';

import Badge from '@/components/ui/Badge'
import Notification from '@/components/ui/Notification'
import Dropdown from '@/components/ui/Dropdown'


import { FaComment, FaAt } from 'react-icons/fa'

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
          <NotificationDropdown/>

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

function NotificationDropdown(){

  const hasUnread = true
  
  const markAllRead = () => {
    console.log('Marking all as read')
  }
  
  const handleNotificationClick = () => {
    console.log('Notification clicked')
  }


  return (
    <Dropdown>
      <Dropdown.Button>
        <IconButton showNotification={hasUnread} altText="notfication" size="small">
          <IoMdNotificationsOutline size={24} color="#7E7065" />
        </IconButton>
      </Dropdown.Button>
      
      <Dropdown.Menu>
        <Dropdown.Header>
          Notifications 
          <Badge>2</Badge>
        </Dropdown.Header>
        
        <Dropdown.Option onClick={markAllRead}>
          Mark all as read
        </Dropdown.Option>
        
        <Dropdown.Divider />
        
        <Notification
          icon={<FaComment size={20} color="#7E7065" />}
          title="New Comment"
          message="Sarah added a comment on chapter 3"
          timestamp="5 minutes ago"
          isRead={false}
          onClick={handleNotificationClick}
        />
        
        <Notification
          icon={<FaAt size={20} color="#7E7065" />}
          title="You were mentioned"
          message="Alex mentioned you in a note on Chapter 7"
          timestamp="1 hour ago"
          isRead={false}
          onClick={handleNotificationClick}
        />
      </Dropdown.Menu>
    </Dropdown>
  )
}
