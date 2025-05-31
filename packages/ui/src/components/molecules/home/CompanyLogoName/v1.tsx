'use client'
import { CompanyLogoNameProps } from "@repo/ts-types/home/v1";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function CompanyLogoName({logo,darkLogo,name}:CompanyLogoNameProps) {
    const {theme} = useTheme();
    const router = useRouter();

    useEffect(()=>{
  
    },[theme])

  return (
      <div onClick={()=>router.push("/")}
        className="flex items-center gap-2 font-cyberdyne cursor-pointer"
      >
        {theme === "dark" ?
          <Image src={darkLogo} alt={name} width={35} height={35} /> : 
          <Image src={logo} alt={name} width={35} height={35} />}
          <div className=" hidden lg:flex flex-col items-start  leading-none bg-gradient-to-r from-white 
          to-white bg-clip-text text-transparent text-md font-bold ">
            <div>{name}</div>

          </div>
      </div>
  );
}