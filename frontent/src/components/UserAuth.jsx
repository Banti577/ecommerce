import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import axios from "axios";

import { HiEye } from "react-icons/hi";
import { HiMiniEyeSlash } from "react-icons/hi2";

import { checkAuth } from "../features/cart/authSlice";
import { useNavigate } from "react-router-dom";
import { validators } from "./utils/validation";

const UserAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
  });

  const [error, setError] = useState({ fullname: "", email: "", password: "" });

  const [isLogin, setIsLogin] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const hasError = Object.values(error).some((err) => err !== "");

  const handleInputs = (e) => {
  
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));

    if (validators[name]) {
      setError((p) => ({ ...p, [name]: validators[name](value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

if (hasError) {
  alert("Please Enter filed in specified format");
  return;
}
    setError("");


    if (!isLogin && (!inputs.fullname || !inputs.gender)) {
      alert("Please fill all fields");
      //  setError("Please fill all signup fields");
      return;
    }

    if (!inputs.email || !inputs.password) {
      //setError("Email and password are required");
      alert("Email and password are required");
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
      setLoading(true);
      const formData = new FormData();
      formData.append("fullname", inputs.fullname);
      formData.append("email", inputs.email);
      formData.append("password", inputs.password);
      formData.append("gender", inputs.gender);

      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      await axios.post(backendUrl + "/auth/signup", formData);

      dispatch(checkAuth());
      toast.success("Signup successful. You can login now.");

      setInputs({
        fullname: "",
        email: "",
        password: "",
        gender: "",
      });

      setIsLogin(true);
    } catch (err) {
      console.log("signoinig err", err);
      toast.error(err?.response?.data || "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  const handleLogin = async () => {
    try {
      setLoading(true);
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(backendUrl + "/auth/login", inputs, {
        withCredentials: true,
      });
      if (response.status === 200) {
        dispatch(checkAuth());
        toast.success("Login Successful");
        navigate("/");
      }

      setInputs({
        fullname: "",
        email: "",
        password: "",
        gender: "",
      });
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.msg ||
          err?.response?.data?.message ||
          err?.response?.data ||
          "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <ToastContainer position="top-center" />
      <div className="w-full max-w-md bg-white border rounded shadow-sm p-6">
        <h2 className="text-xl font-bold mb-5">
          {isLogin ? "Login" : "Create account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm text-gray-600 mb-1 uppercase">
                  Full name
                </label>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Enter FullName"
                  value={inputs.fullname}
                  onChange={handleInputs}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>

              {error.fullname ? (
                <p className="text-red-400 text-xs">{error.fullname}</p>
              ) : (
                <p className="text-white/5 text-xs p-0">'</p>
              )}
            </>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-1 uppercase">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={inputs.email}
              onChange={handleInputs}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {error.email ? (
            <p className="text-red-400 text-xs ">{error.email}</p>
          ) : (
            <p className="text-white/5 text-xs">'</p>
          )}

          <div>
            <label className="block text-sm text-gray-600 mb-1 uppercase">
              Password
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={inputs.password}
                onChange={handleInputs}
                className="w-full border px-3 py-2 rounded pr-10"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((p) => !p)}
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              >
                {isPasswordVisible ? <HiMiniEyeSlash /> : <HiEye />}
              </button>
            </div>
          </div>

          {error.password ? (
            <p className="text-red-400 text-xs">{error.password}</p>
          ) : (
            <p className="text-white/5 text-xs">'</p>
          )}

          {!isLogin && (
            <div>
              <p className="text-sm text-gray-600 mb-1 uppercase">Gender</p>
              <div className="flex gap-4 text-sm ">
                {["male", "female", "other"].map((g) => (
                  <label key={g} className="flex items-center gap-1 ">
                    <input
                      className="cursor-pointer"
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
          )}

          <button
            type="submit"
            // disabled={hasError}
            className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 disabled:bg-gray-400 cursor-pointer"
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
            className="ml-2 text-green-600 cursor-pointer"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default UserAuth;
