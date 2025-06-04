import { NavbarSectionProps, RouteProps } from "@repo/ts-types/landing-page/navbar";

const title = "Git-Grasp"
const logo = "https://strapi.bayesian-labs.com/uploads/icon_494a035f1f.png"
const darkLogo = "https://strapi.bayesian-labs.com/uploads/icon_494a035f1f.png"
const donateNowLink = undefined
const githubLink = "https://github.com/anoopkarnik/git-grasp"
const githubUsername = "anoopkarnik"
const githubRepositoryName = "git-grasp"
const version = "v1"
const getStartedLink = "/sign-in"

const routeList: RouteProps[] = [
  {href: "#features", label: "Features",},
  {href: "#testimonials", label: "Testimonials",},
  {href: "#faq", label: "FAQ",}
]

export const navbarSection:NavbarSectionProps = {
    routeList,
    githubLink,
    githubUsername,
    githubRepositoryName,
    title,
    logo,
    darkLogo,
    getStartedLink,
    donateNowLink,
    version
  }