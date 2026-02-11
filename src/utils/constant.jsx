import { TbWorld } from "react-icons/tb";
import { CiClock2, CiMobile1 } from "react-icons/ci";
import { FaRegCheckCircle } from "react-icons/fa";
import { GiHistogram } from "react-icons/gi";
import { MdOutlineShield, MdOutlineSettings } from "react-icons/md";
import { RiFlashlightLine, RiGroupLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoLock, GoBook } from "react-icons/go";
import { RiGeminiLine } from "react-icons/ri";

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
    icon: <CiClock2 className="text-xl text-white dark:text-black font-bold" />,
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
