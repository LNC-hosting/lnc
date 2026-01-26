export interface Partner {
  name: string;
  type: string;
}

export interface Community {
  name: string;
  category: string;
  logo: string;
  size: 'small' | 'big';
  priority: number;
}

export const COMMUNITIES: Community[] = [
  {
    name: "Binary",
    category: "Tech Community",
    logo: "/assets/logos/partners/binary.png",
    size: "small",
    priority: 1,
  },
  {
    name: "Statuscode 2",
    category: "Developer Community",
    logo: "/assets/logos/partners/statuscode2.png",
    size: "big",
    priority: 3,
  },
  {
    name: "FOSS United Kolkata",
    category: "Open Source Community",
    logo: "/assets/logos/partners/foss-united.png",
    size: "big",
    priority: 1,
  },
  {
    name: "Hack4Bengal",
    category: "Hackathon Platform",
    logo: "/assets/logos/partners/hack4bengal.png",
    size: "big",
    priority: 3,
  },
  {
    name: "HackQuest",
    category: "Learning Platform",
    logo: "/assets/logos/partners/hackquest.png",
    size: "big",
    priority: 3,
  },
  {
    name: "Risein",
    category: "Tech Network",
    logo: "/assets/logos/partners/risein.png",
    size: "big",
    priority: 3,
  },
  {
    name: "FIEM ACM Student Chapter",
    category: "Student Chapter",
    logo: "/assets/logos/partners/fiem-acm.png",
    size: "small",
    priority: 1,
  },
  {
    name: "MetaMorph",
    category: "Tech Community",
    logo: "/assets/logos/partners/metamorph.png",
    size: "big",
    priority: 3,
  },
  {
    name: "Samarth TMSL",
    category: "College Community",
    logo: "/assets/logos/partners/samarth-tmsl.png",
    size: "big",
    priority: 2,
  },
  {
    name: "IIT Bombay",
    category: "Academic Institution",
    logo: "/assets/logos/partners/iit-bombay.png",
    size: "small",
    priority: 1,
  },
  {
    name: "IIT Guwahati",
    category: "Academic Institution",
    logo: "/assets/logos/partners/iit-guwahati.png",
    size: "small",
    priority: 1,
  },
  {
    name: "IIT Madras",
    category: "Academic Institution",
    logo: "/assets/logos/partners/iit-madras.png",
    size: "small",
    priority: 1,
  },
  {
    name: "IISER Kolkata",
    category: "Research Institute",
    logo: "/assets/logos/partners/iiser-kolkata.png",
    size: "small",
    priority: 1,
  },
]
