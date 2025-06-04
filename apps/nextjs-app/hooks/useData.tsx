"use client";

import { useEffect, useState } from "react";
import { navbarSection } from "../lib/constants/landing-page/navbar";
import { testimonialSection } from "../lib/constants/landing-page/testimonials";
import { footerSection } from "../lib/constants/landing-page/footer";
import { heroSection } from "../lib/constants/landing-page/hero";
import { faqSection } from "../lib/constants/landing-page/faq";
import { pricingSection } from "../lib/constants/landing-page/pricing";
import { featureSection } from "../lib/constants/landing-page/features";
import { termsOfService } from "../lib/constants/legal/termsOfService";
import { privacyPolicy } from "../lib/constants/legal/privacyPolicy";
import { cancellationRefundPolicies } from "../lib/constants/legal/cancellationRefundPolicies";
import { contactUs } from "../lib/constants/legal/contactUs";
import { getLegalDetails, getSaaSDetails } from "@repo/storage/strapi/landing";

export const useData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [navbarSectionState, setNavbarSectionState] = useState(navbarSection);
  const [heroSectionState, setHeroSectionState] = useState(heroSection);
  const [featureSectionState, setFeatureSectionState] = useState(featureSection);
  const [testimonialSectionState, setTestimonialSectionState] = useState(testimonialSection);
  const [faqSectionState, setFaqSectionState] = useState(faqSection);
  const [pricingSectionState, setPricingSectionState] = useState(pricingSection);
  const [footerSectionState, setFooterSectionState] = useState(footerSection);

  const [termsOfServiceState, setTermsOfServiceState] = useState(termsOfService);
  const [privacyPolicyState, setPrivacyPolicyState] = useState(privacyPolicy);
  const [cancellationRefundPoliciesState, setCancellationRefundPoliciesState] = useState(cancellationRefundPolicies);
  const [contactUsState, setContactUsState] = useState(contactUs);

  useEffect(() => {
      const source = process.env.NEXT_PUBLIC_CMS_SOURCE;

    if (source === "strapi") {
      console.log("Fetching data from Strapi CMS");
      // If the source is Strapi, fetch data from Strapi CMS
      updateDataFromStrapiCms();
    } else {
      setIsLoading(false);
    }
  }, []);

  const updateDataFromStrapiCms = async () => {
    setIsLoading(true);
    try {
      const saasDetails = await getSaaSDetails();
      setNavbarSectionState(saasDetails.navbarSection);
      setHeroSectionState(saasDetails.heroSection);
      setFeatureSectionState(saasDetails.featureSection);
      setTestimonialSectionState(saasDetails.testimonialSection);
      setFaqSectionState(saasDetails.faqSection);
      setPricingSectionState(saasDetails.pricingSection);
      setFooterSectionState(saasDetails.footerSection);

      const legalDetails = await getLegalDetails();
      setPrivacyPolicyState(legalDetails.privacyPolicy);
      setTermsOfServiceState(legalDetails.termsOfService);
      setCancellationRefundPoliciesState(legalDetails.cancellationRefundPolicies);
      setContactUsState(legalDetails.contactUs);
    } catch (error) {
      console.error("Error fetching CMS data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateDataFromFiles = () => {
    setNavbarSectionState(navbarSection);
    setHeroSectionState(heroSection);
    setFeatureSectionState(featureSection);
    setTestimonialSectionState(testimonialSection);
    setFaqSectionState(faqSection);
    setPricingSectionState(pricingSection);
    setFooterSectionState(footerSection);
    setPrivacyPolicyState(privacyPolicy);
    setTermsOfServiceState(termsOfService);
    setCancellationRefundPoliciesState(cancellationRefundPolicies);
    setContactUsState(contactUs);
  };


  return {
    isLoading,
    navbarSectionState,
    heroSectionState,
    featureSectionState,
    testimonialSectionState,
    faqSectionState,
    pricingSectionState,
    footerSectionState,
    termsOfServiceState,
    privacyPolicyState,
    cancellationRefundPoliciesState,
    contactUsState
  };
};
