
import { HeroSectionProps, ImageProps } from "@repo/ts-types/landing-page/hero"

const documentationLink = "/landing/doc"
const appointmentLink = undefined
const tagline = "The knowledge layer your codebase was missing"
const description = `Git Grasp is an AI-powered onboarding and continuous learning tool that transforms GitHub repositories into personalized syllabuses and quizzes. It helps engineers understand and contribute to codebases faster—boosting productivity, confidence, and team alignment from day one.`
const blogLink = undefined
const getStartedLink = "/sign-in"
const version = "v2"
const videoUrl = "https://www.loom.com/embed/c8ab9a84a87246e6ad7884ab1fc6a4fd?sid=22c19d48-0379-4b44-ade4-533d47654b59"
const images:ImageProps[] = []

export const heroSection: HeroSectionProps = {
    documentationLink,
    appointmentLink,
    tagline,
    description,
    blogLink,
    getStartedLink,
    version,
    videoUrl,
    images
}