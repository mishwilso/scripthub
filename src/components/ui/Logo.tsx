
import Image from 'next/image'
import logo from "@/assets/logo/scripthub-logo.png";
import logoName from "@/assets/logo/script-hub-logo-name.png";

interface LogoProps {
    logoSize?: string
    nameSize?: string
}


export default function Logo({logoSize = "w-10", nameSize = "w-24"}: LogoProps){
    return (
        <div className="flex items-center gap-2 transition delay-75 duration-300 ease-in-out hover:scale-105">
          <div className={logoSize}>
            <Image
              src={logo}
              alt="Scripthub logo"
            />
          </div>
          <div className={`${nameSize} pt-1`}>
            <Image src={logoName} alt="ScriptHUB" />
          </div>
        </div>
    )
}