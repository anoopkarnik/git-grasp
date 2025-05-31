"use client";

import { sidebarProps } from "@repo/ts-types/home/v1";
import ProgressWithCredits from "@repo/payments/components/molecules/ProgressWithCredits/v1";
import { useSession } from "@repo/auth/better-auth/auth-client";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@repo/ui/organisms/shadcn/sidebar";
import { CompanyLogoName } from "@repo/ui/molecules/home/CompanyLogoName/v1";
import SidebarItems from "@repo/ui/molecules/sidebar/SidebarItems/v1";
import SidebarUser from "@repo/ui/molecules/sidebar/SidebarUser/v1";
import type { GithubProject } from "@prisma/client";
import useProject from "../hooks/useProject";
import { Button } from "@repo/ui/atoms/shadcn/button";
import { PlusIcon } from "lucide-react";
import { Dialog, DialogContent } from "@repo/ui/molecules/shadcn/dialog";
import { useState } from "react";
import CreateProjectForm from "./CreateProjectForm";
import { cn } from "@repo/ui/lib/utils";

interface Props extends sidebarProps {
    projects?: GithubProject[]; // Adjust type as necessary
}

export function AppSidebar({navbarSection,items,showCredits,projects}:Props) {
       
    const { data:session } = useSession()
    const { setProjectId, projectId } = useProject();
    const [open, setOpen] = useState(false);
    
    return (
        <>
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
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Projects</SidebarGroupLabel>
                    <SidebarMenu>
                        {projects?.map((project) => (
                            <SidebarMenuItem key={project.id}>
                                <SidebarMenuButton asChild>
                                    <div className={cn("flex items-center gap-2",
                                        projectId == project.id && 'text-primary font-semibold'
                                    )}
                                    onClick={() => setProjectId(project.id)}>
                                        {project.name}
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                
                <Button variant={'default'} onClick={() => setOpen(true)}
                className="flex items-center justify-center gap-2 max-w-[150px] ml-8 ">
                    <PlusIcon className="h-4 w-4" />
                    Create Project
                </Button>
            </SidebarContent>

            {/* <SidebarFooterItems footerItems={footerItems}/> */}

            <SidebarFooter>
                {/* {userDetails?.access === "TRIAL" ? <UpgradeToProButton />:null} */}
                {showCredits && 
                <ProgressWithCredits creditsUsed={session.user.creditsUsed} creditsTotal={session.user.creditsTotal}/>}
                <SidebarUser  />
            </SidebarFooter>
        </Sidebar>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <CreateProjectForm/>
            </DialogContent>
        </Dialog>
        </>
    );
}
  