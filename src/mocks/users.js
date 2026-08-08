// One demo account per role per tenant, tagged with tenantId ("platform" for
// Super Admin, null for independent learners with no school affiliation).
// BACKEND: POST /api/auth/login -> { token } where the token carries
// (role, tenantId, assignedClassIds?, assignedSubjectIds?) per MATLEARN_ROADMAP.md §3/§14.

const users = [
  { id: "super-1", name: "Lawal Sulaimon", email: "superadmin@matlearn.com", role: "SuperAdmin", tenantId: "platform" },

  { id: "greenfield-admin-1", name: "Mrs Adeyemi", email: "admin@greenfield.matlearn.com", role: "Admin", tenantId: "greenfield" },
  {
    id: "greenfield-tutor-1",
    name: "Dr Musa Bello",
    email: "tutor@greenfield.matlearn.com",
    role: "Tutor",
    tenantId: "greenfield",
    assignedClassIds: ["ss2-science"],
    assignedSubjectIds: ["biology", "physics"],
  },
  { id: "greenfield-student-1", name: "Amina Yusuf", email: "student@greenfield.matlearn.com", role: "Student", tenantId: "greenfield", classId: "ss2-science" },

  { id: "bluecrest-admin-1", name: "Mr Okafor", email: "admin@bluecrest.matlearn.com", role: "Admin", tenantId: "bluecrest" },
  {
    id: "bluecrest-tutor-1",
    name: "Mrs Grace Eze",
    email: "tutor@bluecrest.matlearn.com",
    role: "Tutor",
    tenantId: "bluecrest",
    assignedClassIds: ["grade9-science"],
    assignedSubjectIds: ["chemistry", "mathematics"],
  },
  { id: "bluecrest-student-1", name: "Chidi Nwosu", email: "student@bluecrest.matlearn.com", role: "Student", tenantId: "bluecrest", classId: "grade9-science" },

  { id: "royalheights-admin-1", name: "Mrs Balogun", email: "admin@royalheights.matlearn.com", role: "Admin", tenantId: "royalheights" },
  {
    id: "royalheights-tutor-1",
    name: "Mr Tunde Ade",
    email: "tutor@royalheights.matlearn.com",
    role: "Tutor",
    tenantId: "royalheights",
    assignedClassIds: ["ss1-science"],
    assignedSubjectIds: ["biology"],
  },
  { id: "royalheights-student-1", name: "Fatima Lawal", email: "student@royalheights.matlearn.com", role: "Student", tenantId: "royalheights", classId: "ss1-science" },

  // Independent learners — no tenant, self-managed profile (§0 assumption 3).
  // Spread across signup months + a mix of subscription tiers/exam goals so
  // the Super Admin learner stats screen shows real variety, not one row.
  {
    id: "learner-1",
    name: "Peter James",
    email: "learner@matlearn.com",
    role: "Learner",
    tenantId: null,
    educationLevel: "SS3",
    examGoals: ["WAEC", "JAMB"],
    subscriptionTier: "free",
    createdAt: "2026-05-10",
    lastActiveAt: "2026-08-06",
  },
  {
    id: "learner-2",
    name: "Ngozi Chukwu",
    email: "ngozi.chukwu@example.com",
    role: "Learner",
    tenantId: null,
    educationLevel: "SS2",
    examGoals: ["WAEC"],
    subscriptionTier: "subscriber",
    createdAt: "2026-05-22",
    lastActiveAt: "2026-08-05",
  },
  {
    id: "learner-3",
    name: "Emeka Obi",
    email: "emeka.obi@example.com",
    role: "Learner",
    tenantId: null,
    educationLevel: "JSS3",
    examGoals: ["NECO"],
    subscriptionTier: "free",
    createdAt: "2026-06-01",
    lastActiveAt: "2026-07-20",
  },
  {
    id: "learner-4",
    name: "Blessing Okoro",
    email: "blessing.okoro@example.com",
    role: "Learner",
    tenantId: null,
    educationLevel: "SS3",
    examGoals: ["JAMB", "WAEC"],
    subscriptionTier: "subscriber",
    createdAt: "2026-06-15",
    lastActiveAt: "2026-08-07",
  },
  {
    id: "learner-5",
    name: "Ibrahim Sule",
    email: "ibrahim.sule@example.com",
    role: "Learner",
    tenantId: null,
    educationLevel: "SS1",
    examGoals: ["IELTS", "TOEFL"],
    subscriptionTier: "subscriber",
    createdAt: "2026-07-02",
    lastActiveAt: "2026-08-01",
  },
  {
    id: "learner-6",
    name: "Grace Adeyemi",
    email: "grace.adeyemi@example.com",
    role: "Learner",
    tenantId: null,
    educationLevel: "SS2",
    examGoals: ["WAEC", "NECO"],
    subscriptionTier: "free",
    createdAt: "2026-07-20",
    lastActiveAt: "2026-07-25",
  },
  {
    id: "learner-7",
    name: "David Umeh",
    email: "david.umeh@example.com",
    role: "Learner",
    tenantId: null,
    educationLevel: "SS3",
    examGoals: ["JAMB"],
    subscriptionTier: "free",
    createdAt: "2026-08-03",
    lastActiveAt: "2026-08-03",
  },
];

export function getUserById(id) {
  return users.find((user) => user.id === id) ?? null;
}

export function findUserByEmail(email) {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export function listUsersForTenant(tenantId) {
  return users.filter((user) => user.tenantId === tenantId);
}

// Independent learners: no tenant affiliation at all (not just "not this
// tenant" — role must also be Learner, since a Super Admin's own tenantId
// is "platform", not null).
export function listIndependentLearners() {
  return users.filter((user) => user.role === "Learner" && user.tenantId === null);
}
