export interface RouteProps {
    href: string;
    label: string;
  }

export interface NavbarSectionProps {
    routeList: RouteProps[];
    githubLink: string;
    githubUsername: string;
    githubRepositoryName: string;
    donateNowLink?: string;
    getStartedLink: string;
    title: string;
    logo: string;
    darkLogo: string;
    version?: string;
  }