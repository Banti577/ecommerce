import { useState } from "react";
import { HiEye } from "react-icons/hi";
import { HiMiniEyeSlash } from "react-icons/hi2";
import axios from "axios";
import { useDispatch } from "react-redux";
import { checkAuth } from "../features/cart/authSlice";

const UserAuth = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
  });

  const [isLogin, setIsLogin] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!inputs.email || !inputs.password) {
      setError("Email and password are required");
      return;
    }

    if (!isLogin && (!inputs.fullname || !inputs.gender)) {
      setError("Please fill all signup fields");
      return;
    }

    if (isLogin) {
      handleLogin();
    } else {
      handleSinUp();
    }
  };

  const handleSinUp = async () => {
    try {
      const formData = new FormData();
      formData.append("fullname", inputs.fullname);
      formData.append("email", inputs.email);
      formData.append("password", inputs.password);
      formData.append("gender", inputs.gender);

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      console.log("theek yaha to aaya");
      const response = await axios.post(backendUrl + "/auth/signup", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("something heppend", response);
      dispatch(checkAuth());
      setInputs({
        fullname: "",
        email: "",
        password: "",
        gender: "",
      });
    } catch (err) {
      console.log("thisis the catch error", err);
    }
  };
  const handleLogin = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(backendUrl + "/auth/login", inputs, {
        withCredentials: true,
      });
      console.log("something heppend", response);

      setInputs({
        fullname: "",
        email: "",
        password: "",
        gender: "",
      });
    } catch (err) {
      console.log("thisis the catch error", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white border rounded shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-5">
          {isLogin ? "Login" : "Create account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={inputs.fullname}
                  onChange={handleInputs}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Gender</p>
                <div className="flex gap-4 text-sm">
                  {["male", "female", "other"].map((g) => (
                    <label key={g} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={inputs.gender === g}
                        onChange={handleInputs}
                      />
                      <span className="capitalize">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleInputs}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={inputs.password}
                onChange={handleInputs}
                className="w-full border px-3 py-2 rounded pr-10"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((p) => !p)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {isPasswordVisible ? <HiMiniEyeSlash /> : <HiEye />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign up"}
          </button>
        </form>

        <p className="text-sm text-center mt-5 text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            className="ml-2 text-green-600"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserAuth;
