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

  { id: "learner-1", name: "Peter James", email: "learner@matlearn.com", role: "Learner", tenantId: null },
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
