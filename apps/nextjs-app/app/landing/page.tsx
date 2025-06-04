"use client"
import LandingPage from "@repo/ui/templates/landing/LandingPage/v1";

import { useGlobalData } from "../../context/DataContext";
import LoadingPage from "@repo/ui/templates/landing/LoadingPage/v1";
import Navbar from "@repo/ui/organisms/landing/Navbar/v1";

export default function Landing() {
  
  const data = useGlobalData();
  


  const functionsToUse = {

}

  if (data.isLoading) {
    return (
      <LoadingPage />
    );
  }


  return (
    <div className="relative">
      <Navbar navbarSection={data.navbarSectionState} />
      <LandingPage
        heroSection={data.heroSectionState}
        featureSection={data.featureSectionState}
        testimonialSection={data.testimonialSectionState}
        teamSection={data.teamSectionState}
        faqSection={data.faqSectionState}
        pricingSection={data.pricingSectionState}
        footerSection={data.footerSectionState}
        functionsToUse={functionsToUse}
      />
    </div>
  );
}
