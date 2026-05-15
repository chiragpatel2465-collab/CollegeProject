import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";

/* ── Mock users (replace with real API call later) ─────────── */
const MOCK_USERS = [
  {
    id: 1,
    name: "Raj Kumar",
    email: "raj.kumar@college.edu.in",
    password: "student123",
    role: "student",
    enrollment: "BT2023045",
    batch: "B.Tech Sem 3",
    department: "Computer Science",
    avatar: "RK",
  },
  {
    id: 2,
    name: "Dr. Vikram Joshi",
    email: "vikram.joshi@college.edu.in",
    password: "faculty123",
    role: "faculty",
    employeeId: "FAC2019012",
    designation: "Associate Professor",
    department: "Computer Science",
    avatar: "VJ",
  },
];

export default function Login() {
  const { login , user} = useAuth();
  const navigate     = useNavigate();
  const location     = useLocation();
  const from         = location.state?.from?.pathname || null;

  const [role, setRole]         = useState("student");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const match = MOCK_USERS.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (!match) {
      setError("Invalid email, password or role. Please try again.");
      setLoading(false);
      return;
    }

    // Strip password before storing
    const { password: _pw, ...safeUser } = match;
     login(safeUser);
    
    // Redirect: go back to attempted page or default dashboard
    const destination =
      from && from.startsWith(`/${role}`)
        ? from
        : role === "faculty"
        ? "/faculty/dashboard"
        : "/student/dashboard";

    navigate(destination, { replace: true });
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">

      {/* Card */}
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden border border-amber-200">

        {/* Gold top accent */}
        <div className="h-1.5 bg-amber-400 w-full" />

        {/* Header */}
        <div className="bg-purple-900 px-8 py-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-amber-50 mb-1">
            Welcome back
          </h1>
          <p className="text-purple-300 text-sm">
            Sign in to your college portal
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-8">

          {/* Role toggle */}
          <div className="flex gap-2 mb-6 bg-amber-50 p-1 rounded-xl border border-amber-200">
            {["student", "faculty"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => { setRole(r); setError(""); }}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition
                  ${role === r
                    ? "bg-purple-900 text-amber-50"
                    : "text-purple-700 hover:bg-amber-100"}`}
              >
                {r === "student" ? "🎓 Student" : "👨‍🏫 Faculty"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-purple-800 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  role === "student"
                    ? "raj.kumar@college.edu.in"
                    : "vikram.joshi@college.edu.in"
                }
                required
                className="w-full bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-sm text-purple-900 placeholder:text-amber-400 outline-none focus:border-purple-400 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-purple-800 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-sm text-purple-900 placeholder:text-amber-400 outline-none focus:border-purple-400 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 hover:text-purple-700 text-xs"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-900 text-amber-50 font-semibold py-3 rounded-xl hover:bg-purple-800 transition disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-amber-50 border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-xs font-semibold text-amber-800 mb-2">Demo credentials</p>
            <div className="text-xs text-amber-700 space-y-1">
              <p>🎓 <span className="font-mono">raj.kumar@college.edu.in</span> / <span className="font-mono">student123</span></p>
              <p>👨‍🏫 <span className="font-mono">vikram.joshi@college.edu.in</span> / <span className="font-mono">faculty123</span></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}