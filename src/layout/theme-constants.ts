import crdaFavicon from "@app/images/crda-favicon.png";
import crdaNavBrandImage from "@app/images/crda-logo-header.svg";
import crdaLogo from "@app/images/crda-logo.svg";
import spogFavicon from "@app/images/spog-favicon.png";
import spogNavBrandImage from "@app/images/spog-logo-header.svg";
import spogLogo from "@app/images/spog-logo.svg";

type ThemeType = "crda" | "spog";
const defaultTheme: ThemeType = "crda";

type ThemeListType = {
  [key in ThemeType]: {
    name: string;
    logoSrc: string;
    logoNavbarSrc: string;
    faviconSrc?: string;
    websiteURL: string;
    documentationURL: string;
  };
};

const themeList: ThemeListType = {
  crda: {
    name: "CRDA",
    logoSrc: crdaLogo,
    logoNavbarSrc: crdaNavBrandImage,
    faviconSrc: crdaFavicon,
    websiteURL: "https://developers.redhat.com/",
    documentationURL: "https://access.redhat.com/documentation",
  },
  spog: {
    name: "Spog",
    logoSrc: spogLogo,
    logoNavbarSrc: spogNavBrandImage,
    faviconSrc: spogFavicon,
    websiteURL: "https://trustification.io/",
    documentationURL: "https://trustification.io/",
  },
};

export const Theme =
  themeList[((window as any)["REPORT_THEME"] as ThemeType) || defaultTheme];
