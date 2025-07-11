import { FooterProps, FooterSectionProps } from "@repo/ts-types/landing-page/footer";

const creator = "Anoop Karnik";
const creatorLink = "https://anoopkarnik.net";
const title = "Git Grasp";
const logo = "https://strapi.bayesian-labs.com/uploads/icon_494a035f1f.png";
const darkLogo = "https://strapi.bayesian-labs.com/uploads/icon_494a035f1f.png";

const footerList: FooterProps[] =  [
        {
            label: "Twitter",
            href: "https://x.com/anooplegend1992",
            type: "Follow Us"
        },
        {
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/anoopkarnik/",
            type: "Follow Us"
        },
        {
            label: "Github",
            href: "https://github.com/anoopkarnik",
            type: "Follow Us"
        },
        {
            label: "Youtube",
            href: "https://youtube.com/@bayesianlabs",
            type: "Follow Us"
        },
        {
            label: "Discord",
            href: "https://discord.gg/ephjwba9",
            type: "Follow Us"
        },
        {
            label: "Cancellation/Refund Policies",
            href: "/landing/legal/cancellation-refund-policies",
            type: "Legal"
        },
        {
            label: "Terms & Conditions",
            href: "/landing/legal/terms-of-service",
            type: "Legal"
        },
        {
            label: "Privacy Policy",
            href: "/landing/legal/privacy-policy",
            type: "Legal"
        },
        {
            label: "Contact Us",
            href: "/landing/legal/contact-us",
            type: "Legal"
        }
    ]

export const footerSection: FooterSectionProps = {
    footerList,
    creator,
    creatorLink,
    title,
    logo,
    darkLogo
}