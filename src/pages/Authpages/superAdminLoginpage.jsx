import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiShield, FiUser } from "react-icons/fi";
import { globalContext } from "../../context/globalcontext";
import { findUserByEmail } from "../../mocks/users";
import Input from "../../component/ui/input";

// Platform-operator login for /matlearn/ (MATLEARN_ROADMAP.md §14) —
// deliberately its own standalone shell, not the shared <Auth> layout
// (that layout is MatLearn/school-branded: "Welcome to Mat Learn", school
// logo, motto — a consumer-product identity that doesn't fit the people who
// operate the platform itself). This is styled as an internal ops console.
export default function SuperAdminLoginPage() {
  const navigate = useNavigate();
  const { setRole, setName, setUserId } = useContext(globalContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // BACKEND: POST /api/platform/auth/login { email, password } -> { token }.
    // Token's tenantId must be "platform" — never a school tenantId, never
    // usable on any school tenant's own session (§14 cross-surface rejection).
    // Password is unchecked here — no backend yet, any non-empty value passes
    // (same convention as every other login page in this app).
    const user = findUserByEmail(email);
    if (!user || user.role !== "SuperAdmin" || user.tenantId !== "platform") {
      setError("Invalid email or password.");
      return;
    }

    setRole(user.role);
    setName(user.name);
    setUserId(user.id);
    navigate("/matlearn/super-admin-dashboard");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-3xl text-indigo-400">
            <FiShield />
          </span>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">
              MatLearn
            </p>
            <p className="text-xl font-bold text-white">Platform Console</p>
          </div>
          <p className="text-sm text-slate-400">
            Operator access only. Not for school staff or students.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"
        >
          <Input
            name={"email"}
            label={"Email"}
            required={true}
            placeholder={"you@matlearn.com"}
            width={"w-full"}
            type={"email"}
            value={email}
            onChange={setEmail}
            icon={<FiUser className="text-lg" />}
          />
          <Input
            name={"password"}
            label={"Password"}
            required={true}
            placeholder={"Enter Your Password"}
            width={"w-full"}
            type={"password"}
            value={password}
            onChange={setPassword}
            icon={<FiLock className="text-lg" />}
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center rounded-xl bg-indigo-500 font-bold text-white transition-all duration-300 hover:bg-indigo-400"
          >
            Sign In
          </button>
        </form>

        <p
          className="mt-6 cursor-pointer text-center text-sm text-slate-500 hover:text-slate-300"
          onClick={() => navigate("/")}
        >
          ← Back to MatLearn
        </p>
      </div>
    </div>
  );
}
