import { NavbarSectionProps } from "../landing-page/navbar";
import { PricingProps, PricingSectionProps } from "../landing-page/pricing";

export interface sidebarHeaderItemsProps{
    title: string;
    icon?: any;
    url?: string;
    isActive?: boolean;
    items?: sidebarHeaderItemsProps[];
}

export interface sidebarHeaderProps {
    [key: string]: sidebarHeaderItemsProps[];
}

export interface sidebarFooterItemsProps {
    title: string;
    url: string;
    icon: any;
}

export interface CompanyLogoNameProps {
    name: string;
    logo: string;
    darkLogo: string;
}


export interface sidebarProps  {
    navbarSection: NavbarSectionProps;
    items: sidebarHeaderProps;
    footerItems: sidebarFooterItemsProps[];
    showCredits: boolean;
}

export interface SettingsDialogProps {
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    openedTab?: string;
  }
  
export interface SettingsHeaderProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export interface CreditsProps {
    creditsUsed: number;
    creditsTotal: number;
}

export interface NotificationProps {
    id: string;
    message: string;
    type: string;
    href: string;
    read: boolean;
    createdAt: string;
    updatedAt: string;
}