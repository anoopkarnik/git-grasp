"use client";
import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../../shadcn/sidebar";
import { sidebarProps } from "@repo/ts-types/home/v1";
import { CompanyLogoName } from "../../../molecules/home/CompanyLogoName/v1";
import SidebarItems from "../../../molecules/sidebar/SidebarItems/v1";
import SidebarUser  from "../../../molecules/sidebar/SidebarUser/v1";
import ProgressWithCredits from "@repo/payments/components/molecules/ProgressWithCredits/v1";
import { useSession } from "@repo/auth/better-auth/auth-client";

export function AppSidebar({navbarSection,items,footerItems,showCredits}:sidebarProps) {
       
    const { data:session } = useSession();
    
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <CompanyLogoName logo={navbarSection?.logo} darkLogo={navbarSection?.darkLogo} name={navbarSection?.title} />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarItems items={items}/>
            {/* <SidebarFooterItems footerItems={footerItems}/> */}

            <SidebarFooter>
                {/* {userDetails?.access === "TRIAL" ? <UpgradeToProButton />:null} */}
                {showCredits && 
                <ProgressWithCredits creditsUsed={session.user.creditsUsed} creditsTotal={session.user.creditsTotal}/>}
                <SidebarUser  />
            </SidebarFooter>
        </Sidebar>
    );
}
  