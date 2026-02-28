import GoogleSignInButton from "@/features/auth/components/GoogleSignInButton";

export default function Login() {
  //   const [form, setForm] = useState({ email: "", password: "" });

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#111] p-4">
      <div className="w-full max-w-md bg-[#1e1e1e] rounded-xl p-6 shadow-lg animate-fadeInUp">
        <h2 className="text-center text-2xl font-bold text-white mb-6">
          Login
        </h2>

        <form className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
        </form>

        <GoogleSignInButton />

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-red-600 underline">
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}
