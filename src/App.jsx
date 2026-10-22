import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SitePage } from "@/components/layout/SitePage";
import { Footer } from "@/components/sections/Footer";
import AdminApp from "@/admin/AdminApp";
import Home, { pageMeta as homeMeta } from "@/pages/Home";
import AboutPage, { pageMeta as aboutMeta } from "@/pages/AboutPage";
import AboutDonationPage, {
  pageMeta as donationMeta,
} from "@/pages/AboutDonationPage";
import AboutBankDetailsPage, {
  pageMeta as bankDetailsMeta,
} from "@/pages/AboutBankDetailsPage";
import AboutInKindSupportPage, {
  pageMeta as inKindMeta,
} from "@/pages/AboutInKindSupportPage";
import AboutMonthlyGivingPage, {
  pageMeta as monthlyGivingMeta,
} from "@/pages/AboutMonthlyGivingPage";
import AboutOneTimeDonationPage, {
  pageMeta as oneTimeMeta,
} from "@/pages/AboutOneTimeDonationPage";
import AboutGetInvolvedPage, {
  pageMeta as getInvolvedMeta,
} from "@/pages/AboutGetInvolvedPage";
import AboutVolunteerPage, {
  pageMeta as volunteerMeta,
} from "@/pages/AboutVolunteerPage";
import AboutPartnerWithUsPage, {
  pageMeta as partnerMeta,
} from "@/pages/AboutPartnerWithUsPage";
import AboutCsrPage, { pageMeta as csrMeta } from "@/pages/AboutCsrPage";
import AboutBecomeTrusteePage, {
  pageMeta as trusteeMeta,
} from "@/pages/AboutBecomeTrusteePage";
import AboutImpactNewsPage, {
  pageMeta as impactNewsMeta,
} from "@/pages/AboutImpactNewsPage";
import AboutNewsAnnouncementsPage, {
  pageMeta as newsAnnouncementsMeta,
} from "@/pages/AboutNewsAnnouncementsPage";
import AboutLeadershipPage, {
  pageMeta as leadershipMeta,
} from "@/pages/AboutLeadershipPage";
import AboutMissionPage, {
  pageMeta as missionMeta,
} from "@/pages/AboutMissionPage";
import AboutProgramsPage, {
  pageMeta as programsMeta,
} from "@/pages/AboutProgramsPage";
import AboutEducationSupportPage, {
  pageMeta as educationMeta,
} from "@/pages/AboutEducationSupportPage";
import AboutHealthWellnessPage, {
  pageMeta as healthMeta,
} from "@/pages/AboutHealthWellnessPage";
import AboutEnvironmentalInitiativesPage, {
  pageMeta as environmentMeta,
} from "@/pages/AboutEnvironmentalInitiativesPage";
import AboutSupportingFarmersPage, {
  pageMeta as farmersMeta,
} from "@/pages/AboutSupportingFarmersPage";
import AboutCommunityDevelopmentPage, {
  pageMeta as communityMeta,
} from "@/pages/AboutCommunityDevelopmentPage";
import AboutSupplyingNutritionPage, {
  pageMeta as nutritionMeta,
} from "@/pages/AboutSupplyingNutritionPage";
import AboutFoodDistributionDrivePage, {
  pageMeta as foodDriveMeta,
} from "@/pages/AboutFoodDistributionDrivePage";
import AboutChildWelfarePage, {
  pageMeta as childWelfareMeta,
} from "@/pages/AboutChildWelfarePage";
import AboutCommunitySupportPage, {
  pageMeta as communitySupportMeta,
} from "@/pages/AboutCommunitySupportPage";
import AboutHealthcareAssistancePage, {
  pageMeta as healthcareMeta,
} from "@/pages/AboutHealthcareAssistancePage";
import AboutEducationForAllPage, {
  pageMeta as educationForAllMeta,
} from "@/pages/AboutEducationForAllPage";
import AboutWomenEmpowermentPage, {
  pageMeta as womenEmpowermentMeta,
} from "@/pages/AboutWomenEmpowermentPage";
import AboutVisionPage, { pageMeta as visionMeta } from "@/pages/AboutVisionPage";
import BlogRoutePage, { pageMeta as blogMeta } from "@/pages/BlogRoutePage";
import BlogArticlePage, { pageMeta as articleMeta } from "@/pages/BlogArticlePage";
import PrivacyPolicyTermsPage, {
  pageMeta as termsMeta,
} from "@/pages/PrivacyPolicyTermsPage";
import TermsOfUseRoutePage, {
  pageMeta as termsOfUseMeta,
} from "@/pages/TermsOfUseRoutePage";
import RefundPolicyRoutePage, {
  pageMeta as refundMeta,
} from "@/pages/RefundPolicyRoutePage";
import ContactRoutePage, {
  pageMeta as contactMeta,
} from "@/pages/ContactRoutePage";

const routes = [
  { path: "/", Component: Home, ...homeMeta },
  { path: "/about", Component: AboutPage, ...aboutMeta },
  { path: "/about/donate", Component: AboutDonationPage, ...donationMeta },
  {
    path: "/about/donate/bank-details",
    Component: AboutBankDetailsPage,
    ...bankDetailsMeta,
  },
  {
    path: "/about/donate/in-kind-support",
    Component: AboutInKindSupportPage,
    ...inKindMeta,
  },
  {
    path: "/about/donate/monthly-giving",
    Component: AboutMonthlyGivingPage,
    ...monthlyGivingMeta,
  },
  {
    path: "/about/donate/one-time",
    Component: AboutOneTimeDonationPage,
    ...oneTimeMeta,
  },
  {
    path: "/about/get-involved",
    Component: AboutGetInvolvedPage,
    ...getInvolvedMeta,
  },
  {
    path: "/about/get-involved/volunteer",
    Component: AboutVolunteerPage,
    ...volunteerMeta,
  },
  {
    path: "/about/get-involved/partner-with-us",
    Component: AboutPartnerWithUsPage,
    ...partnerMeta,
  },
  {
    path: "/about/get-involved/csr",
    Component: AboutCsrPage,
    ...csrMeta,
  },
  {
    path: "/about/get-involved/become-a-trustee",
    Component: AboutBecomeTrusteePage,
    ...trusteeMeta,
  },
  {
    path: "/about/impact-news",
    Component: AboutImpactNewsPage,
    ...impactNewsMeta,
  },
  {
    path: "/about/impact-news/providing-nutritious-food",
    Component: AboutNewsAnnouncementsPage,
    ...newsAnnouncementsMeta,
  },
  {
    path: "/about/leadership",
    Component: AboutLeadershipPage,
    ...leadershipMeta,
  },
  { path: "/about/mission", Component: AboutMissionPage, ...missionMeta },
  { path: "/about/programs", Component: AboutProgramsPage, ...programsMeta },
  {
    path: "/about/programs/education-support",
    Component: AboutEducationSupportPage,
    ...educationMeta,
  },
  {
    path: "/about/programs/health-wellness",
    Component: AboutHealthWellnessPage,
    ...healthMeta,
  },
  {
    path: "/about/programs/environmental-initiatives",
    Component: AboutEnvironmentalInitiativesPage,
    ...environmentMeta,
  },
  {
    path: "/about/programs/supporting-farmers",
    Component: AboutSupportingFarmersPage,
    ...farmersMeta,
  },
  {
    path: "/about/programs/community-development",
    Component: AboutCommunityDevelopmentPage,
    ...communityMeta,
  },
  {
    path: "/about/programs/supplying-nutrition",
    Component: AboutSupplyingNutritionPage,
    ...nutritionMeta,
  },
  {
    path: "/about/programs/food-distribution-drive",
    Component: AboutFoodDistributionDrivePage,
    ...foodDriveMeta,
  },
  {
    path: "/about/programs/child-welfare-care",
    Component: AboutChildWelfarePage,
    ...childWelfareMeta,
  },
  {
    path: "/about/programs/community-support",
    Component: AboutCommunitySupportPage,
    ...communitySupportMeta,
  },
  {
    path: "/about/programs/healthcare-assistance",
    Component: AboutHealthcareAssistancePage,
    ...healthcareMeta,
  },
  {
    path: "/about/programs/education-for-all",
    Component: AboutEducationForAllPage,
    ...educationForAllMeta,
  },
  {
    path: "/about/programs/women-empowerment",
    Component: AboutWomenEmpowermentPage,
    ...womenEmpowermentMeta,
  },
  { path: "/about/vision", Component: AboutVisionPage, ...visionMeta },
  { path: "/blog", Component: BlogRoutePage, ...blogMeta },
  { path: "/blog/:slug", Component: BlogArticlePage, ...articleMeta },
  {
    path: "/privacy-policy-terms",
    Component: PrivacyPolicyTermsPage,
    ...termsMeta,
  },
  {
    path: "/terms-of-use",
    Component: TermsOfUseRoutePage,
    ...termsOfUseMeta,
  },
  {
    path: "/refund-policy",
    Component: RefundPolicyRoutePage,
    ...refundMeta,
  },
  { path: "/contact", Component: ContactRoutePage, ...contactMeta },
];

function DocumentMeta() {
  const { pathname } = useLocation();
  const current = routes.find((route) => route.path === pathname) ?? routes[0];

  useEffect(() => {
    document.title = current.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", current.description);
    window.scrollTo(0, 0);
  }, [current, pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/admin")) {
    return <AdminApp />;
  }

  return (
    <>
      <DocumentMeta />
      <div className="relative min-h-screen">
        <SiteHeader />
        <div key={pathname} className="page-enter">
          {pathname === "/" ? (
            <Routes>
              {routes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
            </Routes>
          ) : (
            <SitePage>
              <Routes>
                {routes.map(({ path, Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
              </Routes>
            </SitePage>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
