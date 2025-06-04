import { faqProps } from "@repo/ts-types/landing-page/faq";

const heading = "Frequently Asked Questions"
const description = undefined
const supportEmailAddress = "support@bayesian-labs.com"
const faqList: faqProps[] = [
    {
        question: "Is this boilerplate code free?",
        answer: "Yes. It is a free and open-source boilerplate code.",
        value: "item-1",
      },
      {
        question: "What are the tools and languages used in this boilerplate code?",
        answer:
          "Nexjs, React, Typescript, Tailwind CSS, Turborepo, Docusaurus, Prisma, Vercel,  NextAuth, Shadcn Atomic Design Components, Shadcn Themes, Shadcn Templates, and many more.",
        value: "item-2",
      },
      {
        question:
          "What level of coding expertise is required to use this boilerplate code?",
        answer:
          "This boilerplate code is beginner-friendly. You can start building your project with minimal coding expertise, if you go through the documentation properly.",
        value: "item-3",
      },
      {
        question: "What kind of support is provided for this boilerplate code?",
        answer: "You can contant us from below link on email on chat with AI trained on our documentation in the bottom right corner.",
        value: "item-4",
      },
      {
        question:
          "How can I contribute to this boilerplate code?",
        answer:
          "You can contribute to this boilerplate code by forking the repository, making changes, and creating a pull request.",
        value: "item-5",
      },
];
const version = "v1";

export const faqSection = {
    heading,
    description,
    supportEmailAddress,
    faqList,
    version
};