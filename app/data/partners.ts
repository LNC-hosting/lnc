export interface Partner {
  name: string;
  type: string;
}

export interface Community {
  name: string;
  category: string;
  logo: string;
}

export const COMMUNITIES: Community[] = [
  {
    name: "Binary",
    category: "Tech Community",
    logo: "/assets/logos/partners/binary.png",
  },
  {
    name: "Statuscode 2",
    category: "Developer Community",
    logo: "/assets/logos/partners/statuscode2.png",
  },
  {
    name: "FOSS United Kolkata",
    category: "Open Source Community",
    logo: "/assets/logos/partners/foss-united.png",
  },
  {
    name: "Hack4Bengal",
    category: "Hackathon Platform",
    logo: "/assets/logos/partners/hack4bengal.png",
  },
  {
    name: "HackQuest",
    category: "Learning Platform",
    logo: "/assets/logos/partners/hackquest.png",
  },
  {
    name: "Risein",
    category: "Tech Network",
    logo: "/assets/logos/partners/risein.png",
  },
  {
    name: "FIEM ACM Student Chapter",
    category: "Student Chapter",
    logo: "/assets/logos/partners/fiem-acm.png",
  },
  {
    name: "MetaMorph",
    category: "Tech Community",
    logo: "/assets/logos/partners/metamorph.png",
  },
  {
    name: "Samarth TMSL",
    category: "College Community",
    logo: "/assets/logos/partners/samarth-tmsl.png",
  },
  {
    name: "IIT Bombay",
    category: "Academic Institution",
    logo: "/assets/logos/partners/iit-bombay.png",
  },
  {
    name: "IIT Guwahati",
    category: "Academic Institution",
    logo: "/assets/logos/partners/iit-guwahati.png",
  },
  {
    name: "IIT Madras",
    category: "Academic Institution",
    logo: "/assets/logos/partners/iit-madras.png",
  },
  {
    name: "IISER Kolkata",
    category: "Research Institute",
    logo: "/assets/logos/partners/iiser-kolkata.png",
  },
];
