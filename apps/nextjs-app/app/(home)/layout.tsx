"use client"

import { SidebarProvider, SidebarTrigger } from "@repo/ui/organisms/shadcn/sidebar"
import { AppSidebar } from "../../components/organisms/Sidebar"
import { sidebarFooterItems, sidebarItems } from "../../lib/constants/home"
import { useSession} from "@repo/auth/better-auth/auth-client";
import { RecoilRoot } from "recoil";
import { Separator } from "@repo/ui/atoms/shadcn/separator";
import {BreadcrumbsHeader} from "@repo/ui/molecules/home/BreadcrumbsHeader/v1"
import LoadingPage from "@repo/ui/templates/landing/LoadingPage/v1";
import Support from "@repo/ui/organisms/support/Support/v1";
import { useGlobalData } from "../../context/DataContext";
import { redirect } from "next/navigation";
import useProject from "../../hooks/useProject";


export default function Layout({ children }: { children: React.ReactNode }) {

    const data = useGlobalData();
    const { isPending,data:session } = useSession();
    const {projects} = useProject()

    if (isPending) {
      return <LoadingPage />;
    }
    
    if (!session) {
      redirect("/landing");
    }

  return (
    <RecoilRoot>
      <SidebarProvider>
          <AppSidebar
            navbarSection={data.navbarSectionState}
            items={sidebarItems}
            footerItems={sidebarFooterItems}
            showCredits={true}
            projects={projects}
          />
        <div className="flex flex-col flex-1 max-h-screen">
          <div className="flex items-center gap-4 py-2">
            <SidebarTrigger />
            <BreadcrumbsHeader />
          </div>
          <Separator/>
          {children}
        </div>
        <Support heroSection={data.heroSectionState} footerSection={data.footerSectionState} 
      navbarSection={data.navbarSectionState} />
      </SidebarProvider>
    </RecoilRoot>
  )
}
