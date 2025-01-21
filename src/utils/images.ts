import logo from "../../public/logo.png";
import shuffle from "../../public/shuffle-01.svg";
import snowFlake from "../../public/snowFlake.svg";
import home from "../../public/home-line.svg";
import connection from "../../public/container.svg";
import barChart from "../../public/bar-chart-10.svg";
import settings from "../../public/settings-01.svg";
import note from "../../public/layout-alt-03.svg";
import policies from "../../public/layers-two-01.svg";
import flux from "../../public/cube-outline.svg";
import bell from "../../public/bell-02.svg";
import search from "../../public/search-sm.svg";
import google from "../../public/google.svg";
import microsoft from "../../public/microsoft.svg";
import comapany1 from "../../public/company_1.svg";
import comapany2 from "../../public/company_2.svg";
import comapany3 from "../../public/company_3.svg";
import unwanted from "../../public/unwanted.svg";
import fluxCube from "../../public/fluxCube.svg";
import gmail from "../../public/connections/gmail.svg";
import okta from "../../public/connections/Okta.svg";
import ms_outlook from "../../public/connections/ms_outlook.svg";

import welcome from "../../public/dashboard/welcome.svg";

import domainIcon from "../../public/dashboard/metric/domainIcon.svg";
import inboxesIcon from "../../public/dashboard/metric/inboxesIcon.svg";
import maliciousIcon from "../../public/dashboard/metric/maliciousIcon.svg";
import messagesIcon from "../../public/dashboard/metric/messagesIcon.svg";
import organizationIcon from "../../public/dashboard/metric/organizationIcon.svg";

const Images = {
  brand: { logo },
  icons: { snowFlake, unwanted, fluxCube },
  menuItems: {
    home,
    connection,
    barChart,
    settings,
    note,
    policies,
    flux,
    shuffle,
    bell,
    search,
  },
  socialIcons: { google, microsoft },
  companyIcon: {
    comapany1,
    comapany2,
    comapany3,
  },
  emailLog: {
    gmail,
    okta,
    ms_outlook,
  },
  illustration: {
    dashboard: {
      welcome,
    },
  },
  dashboard: {
    metric: {
      domainIcon,
      inboxesIcon,
      maliciousIcon,
      messagesIcon,
      organizationIcon,
    },
  },
};

export default Images;
