import { TestimonialProps, TestimonialSectionProps } from "@repo/ts-types/landing-page/testimonials";

const heading = "Discover Why People Love This Product";
const description = "These are some of the testimonials that we have received from our clients. "
const testimonials: TestimonialProps[] = [
    {
      name: "Anoop Karnik",
      userName: "@anoopbayesian",
      image: "https://strapi.bayesian-labs.com/uploads/d28afb4411234c61a7899ac281fd10fe_326f479822.jpg",
      comment: "🧠 Just tried Git Grasp and wow—onboarding new devs feels like handing them a personal guide to the repo. Game-changer! #100xBuildathon2 #DevTools",
      title: "Founder of Bayesian Labs",
    },
    {
      name: "Sarah Lin",
      userName: "@sarahlin",
      image: "https://strapi.bayesian-labs.com/uploads/pexels_pixabay_415829_0f0713e908.jpg",
      comment: "🔥 Git Grasp turned our chaotic internal docs into structured, interactive learning. Less confusion, more contribution. #AI #DeveloperExperience",
      title: "Founder of FinPilot",
    },
        {
      name: "Daniel Rivera",
      userName: "@danielr",
      image: "https://strapi.bayesian-labs.com/uploads/pexels_justin_shaifer_501272_1222271_4742945d25.jpg",
      comment: "🎯 Finally a tool that understands dev onboarding isn’t about HR checklists—it’s about understanding the code. Git Grasp nailed it.",
      title: "CTO, QuickLaunchAI",
    },
        {
      name: "Kavya Sharma",
      userName: "@kavyash",
      image: "https://strapi.bayesian-labs.com/uploads/pexels_danxavier_1102341_6087cb8f41.jpg",
      comment: "💡 Git Grasp analyzed our GitHub repo and generated a full syllabus + quiz set in minutes. Best use of LLMs I’ve seen for dev onboarding!",
      title: "Full-Stack Developer, Freelance",
    },
        {
      name: "James “CodeNoob” Nguyen",
      userName: "@jamescode",
      image: "https://strapi.bayesian-labs.com/uploads/pexels_simon_robben_55958_614810_5cd73796e8.jpg",
      comment: "📈 Our interns used Git Grasp and contributed to production in under 5 days. That's a first. This tool actually works",
      title: "Indie Hacker",
    },
        {
      name: "Marcus Deane",
      userName: "@marcusdean",
      image: "https://strapi.bayesian-labs.com/uploads/pexels_mastercowley_1300402_7ee2d61e91.jpg",
      comment: "🛠️ Every startup struggles with onboarding. Git Grasp makes it a strength instead of a bottleneck. Loving it so far. #BuildInPublic",
      title: "VP of Engineering, NovaStack",
    },
        {
      name: "Eli Cohen",
      userName: "@elicohen",
      image: "https://strapi.bayesian-labs.com/uploads/pexels_olly_874158_c744de7f27.jpg",
      comment: "🧩 Took a quiz on a repo I thought I knew. Git Grasp showed me what I missed. Continuous learning for devs is here.",
      title: "Tech Lead, Velocity Apps",
    },
    {
      name: "Lucía Fernández",
      userName: "@luciafernandez",
      image: "https://strapi.bayesian-labs.com/uploads/pexels_olly_733872_1a35655942.jpg",
      comment: "⏱️ Git Grasp saved us 2+ weeks of onboarding per hire. If you run a dev team, don’t sleep on this. #DevEfficiency #AItools",
      title: "Product Engineer, CloudBotics",
    },
    {
      name: "Omkar Jain",
      userName: "@omkarjain",
      image: "https://strapi.bayesian-labs.com/uploads/pexels_nkhajotia_1516680_01f277d97c.jpg",
      comment: "👀 I joined an open source project and Git Grasp guided me like a mentor. Repos are finally readable. #OpenSource #LLMpowered",
      title: "Developer Advocate, SaaSFoundry",
    },
    {
      name: "Isabella Rossi",
      userName: "@isabellarossi",
      image: "https://strapi.bayesian-labs.com/uploads/pexels_danxavier_1239291_326365f05f.jpg",
      comment: "💬 Git Grasp doesn't just teach you the codebase—it teaches your codebase. Personalized learning is the future of engineering onboarding.",
      title: "UX Engineer, Launchmatic",
    },
  ];
const version = "v2";

export const testimonialSection: TestimonialSectionProps = {
    heading,
    description,
    testimonials,
    version
}