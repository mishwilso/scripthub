import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import hero_bg from "@/assets/dashboard/hero_bg.png";

import { capitalizeFirstLetter } from "@/lib/utils/formatString";

export default function DashboardHero() {
  const { user } = useAuth();
  const userName = capitalizeFirstLetter(user?.user_metadata.name);

  return (
    <div className="flex justify-between px-6 bg-neutral-base rounded-xl">
      <div className="flex flex-col w-[400px] py-6 gap-6 items-start">
        <div className="flex flex-col gap-1">
          <h2 className="font-bold text-neutral-dark" style={{fontSize: '2.25rem', lineHeight: '3rem'}}>Welcome back,<br/>{userName}!</h2>
          <p>Really awesome qoute to encourage writing</p>
        </div>
        <button
          className="developer-button text-sm font-bold text-white-base stroke-black rounded-xl py-3 px-8"
        >
          Check out Developer 
        </button>
      </div>
      <div className="hidden md:flex relative w-[32rem] h-full " >
        <Image
          src={hero_bg}
          alt="A girl, a rabbit and a man wearing a hat sitting at a table drinking tea."
          fill
        />
      </div>
    </div>
  );
}
