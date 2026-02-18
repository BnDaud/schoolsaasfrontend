import { TbWorld, TbTargetArrow } from "react-icons/tb";
import { CiMobile1 } from "react-icons/ci";
import { FaRegCheckCircle, FaRegClock, FaRegHeart } from "react-icons/fa";
import { GiHistogram } from "react-icons/gi";
import {
  MdOutlineShield,
  MdOutlineSettings,
  MdLightbulbOutline,
  MdOutlineMarkEmailUnread,
  MdChatBubbleOutline,
  MdOutlineHeadsetMic,
} from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

import { FiPhoneCall } from "react-icons/fi";
import { RiFlashlightLine, RiGroupLine, RiGeminiLine } from "react-icons/ri";
import { TfiLocationPin } from "react-icons/tfi";
import { IoDocumentTextOutline, IoShieldOutline } from "react-icons/io5";
import { GoLock, GoBook, GoTrophy } from "react-icons/go";
import cto from "../assets/images/cto.png";
import ceo from "../assets/images/ceo.png";
import hcs from "../assets/images/hcs.png";
import PM from "../assets/images/PM.png";

export const AppName = "Mat Learn";

export const features = [
  {
    id: 1,
    name: "AI Study Assistant",
    icon: (
      <RiGeminiLine className="text-xl text-white dark:text-black font-bold" />
    ),
    description:
      "An intelligent AI assistant that helps students when they get stuck during practice or exams. Provides hints, explanations, and guidance to improve understanding without giving away direct answers.",
    checkpoint: [
      "Step-by-step explanations",
      "Smart hints (not full answers)",
      "Concept clarification",
      "24/7 instant support",
    ],
  },
  {
    id: 2,
    name: "Easy Exam Creation",
    icon: (
      <FaRegCheckCircle className="text-xl text-white dark:text-black font-bold" />
    ),
    description:
      "Create exams in minutes with our intuitive question builder and import tools. Support for multiple question types including MCQ, True/False, and Essay.",
    checkpoint: [
      "Drag-and-drop question ordering",
      "Bulk import from Excel/CSV",
      "Question bank library",
      "Template support",
    ],
  },
  {
    id: 3,
    name: "Automated Grading",
    icon: (
      <FaRegClock className="text-xl text-white dark:text-black font-bold" />
    ),
    description:
      "Instant results with detailed analytics. Save hours of manual marking with automatic scoring for objective questions.",
    checkpoint: [
      "Real-time scoring",
      "Partial credit support",
      "Essay marking tools",
      "Grade curves",
    ],
  },
  {
    id: 4,
    name: "National Exam Preparation & Practice",
    icon: <GoBook className="text-xl text-white dark:text-black font-bold" />,
    description:
      "Comprehensive preparation platform for JAMB, WAEC, BECE, and Common Entrance exams with structured practice, past questions, mock tests, and self-paced learning tools.",
    checkpoint: [
      "JAMB , WAEC past questions & CBT simulations",
      "BECE curated practice & mock exams",
      "Common Entrance practice tests",
      "Instant feedback & performance tracking",
    ],
  },
  {
    id: 5,
    name: "Performance Analytics",
    icon: (
      <GiHistogram className="text-xl text-white dark:text-black font-bold" />
    ),
    description:
      "Track student progress with comprehensive reports and insights. Identify struggling students and top performers.",
    checkpoint: [
      "Individual progress tracking",
      "Class comparison reports",
      "Subject-wise analysis",
      "Trend visualization",
    ],
  },
  {
    id: 6,
    name: "Secure Testing",
    icon: (
      <MdOutlineShield className="text-xl text-white dark:text-black font-bold" />
    ),
    description:
      "Anti-cheating measures with browser lockdown and question randomization. Ensure exam integrity.",
    checkpoint: [
      "Tab-switch detection",
      "Copy-paste prevention",
      "Question shuffling",
      "Time monitoring",
    ],
  },
  {
    id: 7,
    name: "Mobile Ready",
    icon: (
      <CiMobile1 className="text-xl text-white dark:text-black font-bold" />
    ),
    description:
      "Works on any device. Students can take exams on phones, tablets, or computers with a fully responsive interface.",
    checkpoint: [
      "iOS and Android support",
      "Offline mode (coming soon)",
      "Touch-optimized UI",
      "Auto-save progress",
    ],
  },
  {
    id: 8,
    name: "Low Bandwidth",
    icon: <TbWorld className="text-xl text-white dark:text-black font-bold" />,
    description:
      "Optimized for African internet conditions. Works even with slow connections to ensure no student is left behind.",
    checkpoint: [
      "Compressed assets",
      "Progressive loading",
      "Connection recovery",
      "Data-saving mode",
    ],
  },
  {
    id: 9,
    name: "Multi-School Management",
    icon: (
      <RiGroupLine className="text-xl text-white dark:text-black font-bold" />
    ),
    description:
      "Perfect for school groups and education networks. Manage multiple branches from a single dashboard.",
    checkpoint: [
      "Centralized admin",
      "Branch-level permissions",
      "Cross-school reports",
      "Shared question banks",
    ],
  },
  {
    id: 10,
    name: "Comprehensive Question Bank",
    icon: (
      <IoDocumentTextOutline className="text-xl text-white dark:text-black font-bold" />
    ),
    description:
      "Build and organize your questions by subject, topic, and difficulty. Reuse questions across multiple exams.",
    checkpoint: [
      "Subject categorization",
      "Difficulty tagging",
      "Search and filter",
      "Question statistics",
    ],
  },
  {
    id: 11,
    name: "Instant Notifications",
    icon: (
      <RiFlashlightLine className="text-xl text-white dark:text-black font-bold" />
    ),
    description:
      "Keep students and teachers informed with real-time notifications for exams, results, and deadlines.",
    checkpoint: [
      "Email notifications",
      "In-app alerts",
      "SMS integration",
      "Custom reminders",
    ],
  },
  {
    id: 12,
    name: "Role-Based Access",
    icon: <GoLock className="text-xl text-white dark:text-black font-bold" />,
    description:
      "Control who can do what with granular permissions for administrators, teachers, and students.",
    checkpoint: [
      "Admin controls",
      "Teacher permissions",
      "Student access",
      "Custom roles",
    ],
  },
  {
    id: 13,
    name: "Customizable Settings",
    icon: (
      <MdOutlineSettings className="text-xl text-white dark:text-black font-bold" />
    ),
    description:
      "Configure exams to match your school's requirements with flexible timing, attempt limits, and more.",
    checkpoint: [
      "Time limits",
      "Attempt restrictions",
      "Pass marks",
      "Negative marking",
    ],
  },
];

export const HowItWorks = [
  {
    id: 1,
    title: "create Free Account",
    exempt:
      "Sign up in seconds with just your email. No payment required to start.",
  },
  {
    id: 2,
    title: "Choose your exam",
    exempt: "Select from JAMB, WAEC, NECO, GCE, BECE, or Common Entrance.",
  },
  {
    id: 3,
    title: "Start Practicing",
    exempt:
      "Access thousands of questions, track your progress, and improve your scores.",
  },
];

export const achivement = [
  {
    score: "200K +",
    title: "Practice Questions",
  },
  {
    score: "500K +",
    title: "Students Helped",
  },
  {
    score: "85%",
    title: "Pass Rate Improvement",
  },
  {
    score: "6",
    title: "Major Exams Covered",
  },
];

export const whyPracticeWithUs = [
  {
    icon: <GoBook className="text-green text-2xl" />,
    title: "Extensive Question Bank",
    description:
      "Access thousands of past questions from previous years with detailed solutions.",
  },
  {
    icon: <TbTargetArrow className="text-green text-2xl" />,
    title: "Exam-Focused Practice",
    description:
      "Questions organized by subject, topic, and year for targeted preparation.",
  },
  {
    icon: <FaRegClock className="text-green text-2xl" />,
    title: "Time Mock Tests",
    description: "Simulate real exam conditions with timed practice sessions.",
  },
  {
    icon: <GoTrophy className="text-green text-2xl" />,
    title: "Performance Tracking",
    description:
      "Monitor your progress and identify areas needing improvement.",
  },
];

export const Exams = [
  {
    name: "JAMB UTME",
    fullname: "Joint Admissions and Matriculation Board",
    about:
      "Prepare for university admission with comprehensive UTME practice tests",
    totalAvailbleQuestions: "50,000",
    ListOfSubjects: [
      "English",
      "Mathematics",
      "Physics",
      "Chemistry",
      "+4 more",
    ],
  },
  {
    name: "WAEC SSCE",
    fullname: "West African Examinations Council",
    about: "Master your WASSCE with past questions and detailed explanations.",
    totalAvailbleQuestions: "40,000",
    ListOfSubjects: [
      "English",
      "Mathematics",
      "Physics",
      "Chemistry",
      "+4 more",
    ],
  },
  {
    name: "NECO SSCE",
    fullname: "National Examinations Council",
    about: "Excel in your NECO exams with targeted practice sessions.",
    totalAvailbleQuestions: "35,000",
    ListOfSubjects: [
      "English",
      "Mathematics",
      "Physics",
      "Chemistry",
      "+4 more",
    ],
  },
  {
    name: "GCE",
    fullname: "General Certificate Examination",
    about: "Boost your grades with focused GCE preparation materials.",
    totalAvailbleQuestions: "30,000",
    ListOfSubjects: [
      "English",
      "Mathematics",
      "Physics",
      "Chemistry",
      "+4 more",
    ],
  },
  {
    name: "BECE",
    fullname: "Basic Education Certificate Examination",
    about: "Junior secondary students can practice for their BECE success.",
    totalAvailbleQuestions: "20,000",
    ListOfSubjects: [
      "English",
      "Mathematics",
      "Basic Science",
      "Social Studies",
      "+1 more",
    ],
  },
  {
    name: "Common Entrance",
    fullname: "National Common Entrance Examination",
    about:
      "Prepare for secondary school admission with age-appropriate practice.",
    totalAvailbleQuestions: "15,000",
    ListOfSubjects: [
      "English",
      "Mathematics",
      "Quantitative Reasoning",
      "Verbal Reasoning",
    ],
  },
];

export const schoolPriceTag = [
  {
    package: "Starter",
    for: "Perfect for small schools getting started",
    price: "₦9,000",

    benefits: [
      "10 to 100 students",
      "5 teacher accounts",
      "Unlimited exams",
      "Basic analytics",
      "Email support",
      "Question bank (500 questions)",
    ],
  },
  {
    package: "Professional",
    for: "Ideal for growing schools",
    price: "₦7,500",

    benefits: [
      "101 to 500 students",
      "20 teacher accounts",
      "Unlimited exams",
      "Advanced analytics",
      "Priority support",
      "Question bank (2,000 questions)",
      "Proctoring features",
      "Custom branding",
    ],
  },
  {
    package: "Enterprise",
    for: "For large schools and networks",
    price: "₦5,000",

    benefits: [
      "Unlimited students",
      "Unlimited teacher accounts",
      "Unlimited exams",
      "Full analytics suite",
      "24/7 dedicated support",
      "Unlimited question bank",
      "Advanced proctoring",
      "Multi-branch management",

      "Custom integrations",
    ],
  },
];

export const RFQ = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes! All plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept bank transfers, card payments (via Paystack), and mobile money. Annual plans get a 20% discount.",
  },
  {
    question: "What happens if I exceed my student limit?",
    answer:
      "We'll notify you when you're approaching your limit. You can easily upgrade to accommodate more students.",
  },
  {
    question: "Do you offer discounts for schools?",
    answer:
      "Yes! We offer special pricing for government schools and non-profits. Contact us for details.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption and your data is stored securely in Nigerian data centers.",
  },
];

export const ourValues = [
  {
    icon: <TbTargetArrow className="text-green text-2xl" />,
    title: "Mission-Driven",
    description:
      "We believe every student deserves access to modern assessment tools, regardless of location or resources.",
  },
  {
    icon: <FaRegHeart className="text-green text-2xl" />,
    title: "Education First",
    description:
      "Our decisions are guided by what's best for educators and students, not just business metrics.",
  },
  {
    icon: <MdLightbulbOutline className="text-green text-2xl" />,
    title: "Innovation",
    description:
      "We continuously improve our platform based on feedback from the schools we serve.",
  },
  {
    icon: <IoShieldOutline className="text-green text-2xl" />,
    title: "Reliability",
    description:
      "Schools depend on us for critical exams. We take that responsibility seriously with 99.9% uptime.",
  },
];

export const team = [
  {
    name: "Ahmad Dada",
    img: ceo,
    position: "Founder & CEO",
    linkedin: "https://www.linkedin.com/in/ahmad-dada-b9b7551b1/",
  },
  {
    name: "Lawal Hassan",
    img: PM,
    position: "Head Of Product",
    linkedin: "https://www.linkedin.com/in/lawalhassan/",
  },
  {
    name: "Lawal Sulaimon",
    img: cto,
    position: "CTO",
    linkedin: "https://www.linkedin.com/in/vectoredmatrix/",
  },
  {
    name: "Muhammad Ali",
    img: hcs,
    position: "Head Of Customer Success",
    linkedin: "https://www.linkedin.com/in/muhammad-ali-a71394171/",
  },
];

export const contactDetails = [
  {
    icon: <MdOutlineMarkEmailUnread className="text-green text-2xl" />,
    title: "Email Us",
    description: "Get a response within 24 hours",
    contact: "Vectoredmatrix@gmail.com",
  },
  {
    icon: <FiPhoneCall className="text-green text-2xl" />,
    title: "Call Us",
    description: "Mon - Fri from 8am to 6pm WAT",
    contact: "+234 808 795 8090 ",
  },
  {
    icon: <TfiLocationPin className="text-green text-2xl" />,
    title: "Visit Us ",
    description: "Come say hello at our office",
    contact: "25 Okota Road Lagos, Nigeria",
  },
  {
    icon: <MdChatBubbleOutline className="text-green text-2xl" />,
    title: "Live Chat",
    description: "Available during business hours",
    contact: "Start a Conversation",
  },
];

export const whyContactUs = [
  {
    name: "Dedicated Support",
    icon: <MdOutlineHeadsetMic className="text-green text-2xl" />,
    comment:
      "Our support team is here to help you get the most out of EduTest. We respond to all inquiries within 24 hours.",
  },
  {
    name: "Enterprise Solutions",
    icon: <HiOutlineOfficeBuilding className="text-2xl text-green" />,
    comment:
      "Running a network of schools? We offer custom solutions with dedicated account management.",
  },
  {
    name: "Quick Onboarding",
    icon: <FaRegClock className="text-green text-2xl" />,
    comment:
      "We offer free training and setup assistance to get your school up and running quickly.",
  },
];
