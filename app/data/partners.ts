import { StaticImageData } from "next/image";

import binaryLogo from "@/app/assets/logos/partners/binary.png";
import statuscode2Logo from "@/app/assets/logos/partners/statuscode2.png";
import fossUnitedLogo from "@/app/assets/logos/partners/foss-united.png";
import hack4bengalLogo from "@/app/assets/logos/partners/hack4bengal.png";
import hackquestLogo from "@/app/assets/logos/partners/hackquest.png";
import riseinLogo from "@/app/assets/logos/partners/risein.png";
import fiemAcmLogo from "@/app/assets/logos/partners/fiem-acm.png";
import metamorphLogo from "@/app/assets/logos/partners/metamorph.png";
import samarthTmslLogo from "@/app/assets/logos/partners/samarth-tmsl.png";
import iitBombayLogo from "@/app/assets/logos/partners/iit-bombay.png";
import iitGuwahatiLogo from "@/app/assets/logos/partners/iit-guwahati.png";
import iitMadrasLogo from "@/app/assets/logos/partners/iit-madras.png";
import iiserKolkataLogo from "@/app/assets/logos/partners/iiser-kolkata.png";

export interface Partner {
  name: string;
  type: string;
}

export interface Community {
  name: string;
  category: string;
  logo: StaticImageData | string;
  size: "small" | "big";
  priority: number;
}

export const COMMUNITIES: Community[] = [
  {
    name: "Binary",
    category: "Tech Community",
    logo: binaryLogo,
    size: "small",
    priority: 1,
  },
  {
    name: "Statuscode 2",
    category: "Developer Community",
    logo: statuscode2Logo,
    size: "big",
    priority: 3,
  },
  {
    name: "FOSS United Kolkata",
    category: "Open Source Community",
    logo: fossUnitedLogo,
    size: "big",
    priority: 1,
  },
  {
    name: "Hack4Bengal",
    category: "Hackathon Platform",
    logo: hack4bengalLogo,
    size: "big",
    priority: 3,
  },
  {
    name: "HackQuest",
    category: "Learning Platform",
    logo: hackquestLogo,
    size: "big",
    priority: 3,
  },
  {
    name: "Risein",
    category: "Tech Network",
    logo: riseinLogo,
    size: "big",
    priority: 3,
  },
  {
    name: "FIEM ACM Student Chapter",
    category: "Student Chapter",
    logo: fiemAcmLogo,
    size: "small",
    priority: 1,
  },
  {
    name: "MetaMorph",
    category: "Tech Community",
    logo: metamorphLogo,
    size: "big",
    priority: 3,
  },
  {
    name: "Samarth TMSL",
    category: "College Community",
    logo: samarthTmslLogo,
    size: "big",
    priority: 2,
  },
  {
    name: "IIT Bombay",
    category: "Academic Institution",
    logo: iitBombayLogo,
    size: "small",
    priority: 1,
  },
  {
    name: "IIT Guwahati",
    category: "Academic Institution",
    logo: iitGuwahatiLogo,
    size: "small",
    priority: 1,
  },
  {
    name: "IIT Madras",
    category: "Academic Institution",
    logo: iitMadrasLogo,
    size: "small",
    priority: 1,
  },
  {
    name: "IISER Kolkata",
    category: "Research Institute",
    logo: iiserKolkataLogo,
    size: "small",
    priority: 1,
  },
];
