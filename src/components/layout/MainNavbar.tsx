import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo/scripthub-logo.png";
import logoName from "@/assets/logo/script-hub-logo-name.png";

import { CiUser } from "react-icons/ci";

import { usePathname } from "next/navigation";

export default function MainNavbar() {
  const pathname = usePathname();
  const path =
    pathname === "/login"
      ? { href: "/signup", name: "Sign Up" }
      : { href: "/login", name: "Log In" };

  return (
    <nav className="min-w-96 flex items-center justify-between bg-white-input px-5 md:px-10 py-3 border-b-2 border-b-outline-input">
      <Link href="/" className="px-1 py-1">
        <div className="flex items-center gap-2 transition delay-75 duration-300 ease-in-out hover:scale-105">
          <div className="w-10">
            <Image
              src={logo}
              alt="Scripthub logo"
            />
          </div>
          <div className="w-24 pt-1">
            <Image src={logoName} alt="ScriptHUB" />
          </div>
        </div>
      </Link>

      <Link
        href={path.href}
        className="text-secondary-dark font-light md:px-4 py-2 rounded-lg hover:bg-secondary-dark/10 transition delay-75 duration-300 ease-in-out hover:scale-105"
      >
        <CiUser className="md:hidden text-secondary-dark w-10 block" title={path.name} size={24}/>
        <span className="hidden md:inline">{path.name}</span>
      </Link>
    </nav>
  );
}
