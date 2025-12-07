import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/scripthub-logo.png";
import logoName from "@/assets/logo/script-hub-logo-name.png";

import Logo from "@/components/ui/Logo"

import { CiUser } from "react-icons/ci";

import { IoDocumentTextOutline } from "react-icons/io5";
import { FaTree } from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

import { IoSettingsOutline } from "react-icons/io5";
import { IoShare } from "react-icons/io5";


import IconButton from '@/components/ui/IconButton'
import Dropdown from "@/components/ui/Dropdown"


import { usePathname } from "next/navigation";

export default function BookNavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 gap-6 justify-between items-center">
        <div className="flex flex-1 gap-6 ">
            <NavLink 
                href="/"
                label="Overview" 
                icon={<IoHome size={24}/>}
            />
            <NavLink 
                href="/"
                label="Chapters" 
                icon={<IoDocumentTextOutline size={24}/>}
            />
            <NavLink 
                href="/"
                label="World Building" 
                icon={<FaTree size={24}/>}
            />
            <NavLink 
                href="/"
                label="Versions" 
                icon={<FaCodeBranch size={24}/>}
            />
        </div>

        <BookOptions />
    </nav>
  );
}

export function NavLink({ href, label, icon, children}: {href: string, children?: React.ReactNode, label: string, icon: React.ReactNode}) {
    const pathname = usePathname();
    const isActive = pathname === href;

    const isActiveStyle = "after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-primary-dark after:rounded-sm"
    const isInActiveStyle = "after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-primary-base after:rounded-sm hover:after:w-full after:transition-[width] after:ease-in-out after:duration-300 after:delay-75 hover:font-medium"

    return (
        <Link 
            href={href} 
            className={`relative p-3 ${isActive ? isActiveStyle : isInActiveStyle}`}
        >
            <span className={`md:hidden ${isActive ? "font-semibold text-primary-dark" : "text-primary-base"}`}>{icon}</span>
            <span className={`hidden md:inline ${isActive ? "font-semibold text-primary-dark" : "text-primary-base"}`} >{label}</span>
        </Link>
    )
}

export function BookOptions() {
  return (
    <Dropdown>
      <Dropdown.Button>
        <IconButton altText="Book options" variant="standard" inert={true}>
          <BsThreeDotsVertical />
        </IconButton>
      </Dropdown.Button>

      <Dropdown.Menu position="top span-left">
        <Dropdown.Option startIcon={<IoSettingsOutline />}>
          Settings
        </Dropdown.Option>

        <Dropdown.Option startIcon={<IoShare />}>
          Share
        </Dropdown.Option>
      </Dropdown.Menu>
    </Dropdown>
  );
}