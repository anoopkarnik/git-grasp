import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FooterSectionProps } from "@repo/ts-types/landing-page/footer";
import { CompanyLogoName } from "../../../molecules/home/CompanyLogoName/v1";

const Footer = ({footerSection}:{footerSection:FooterSectionProps}) => {
    const [footerTypes, setFooterTypes] = useState<any>([]);
    const {theme} = useTheme();

    useEffect(()=>{
        const types = footerSection.footerList?.map(footer=>footer.type);
        setFooterTypes(new Set(types));
    },[theme,footerSection.footerList])

    
  return (
    <div id="footer" className="w-full container  ">
        <hr className="w-full mx-auto" />
        <div className="w-full flex flex-wrap items-start justify-around gap-4 my-10 ">
            <section className="hidden lg:flex w-1/2 font-cyberdyne">
                <CompanyLogoName logo={footerSection?.logo} darkLogo={footerSection?.darkLogo} name={footerSection?.title} />
               
            </section>
            {[...footerTypes]?.map((type:string)=>(
                <div key={type} className="flex flex-col gap-2">
                    <h3 className="text-paragraph">{type}</h3>
                    {footerSection.footerList?.filter(footer => footer.type===type)?.map((item)=>(
                        <div key={item.label}>
                            <a
                                rel="noreferrer noopener"
                                href={item.href}
                                className="opacity-60 hover:opacity-100 text-description"
                            >
                            {item.label}
                            </a>
                        </div>
                    ))}
                </div>
            ))}
        </div>


        <section className="container pb-14 text-center text-paragraph">
            <h3>
            &copy; 2024 Made by {" "}
            <a
                rel="noreferrer noopener"
                target="_blank"
                href={footerSection.creatorLink}
                className="text-primary transition-all border-primary hover:border-b-2"
            >
                {footerSection.creator}
            </a>
            </h3>
        </section>
    </div>
  );
};

export default Footer;