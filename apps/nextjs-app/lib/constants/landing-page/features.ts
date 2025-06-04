import { FeatureListProps, FeatureSectionProps, FeatureWithDescriptionProps } from "@repo/ts-types/landing-page/features";

const heading = "Frameworks, Tools & Technologies Used in This Boilerplate"
const description = `
Our platform integrates a lot of frameworks, tools and technologies give you choice on your preferred  one  for the feature you need.
`
const featuresWithDescription: FeatureWithDescriptionProps[] = [

  ];

const featureList: FeatureListProps[]= [
  ];

const version = "v2"

export const featureSection:FeatureSectionProps = {
    heading,
    description,
    featuresWithDescription,
    featureList,
    version
};