import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ForgotResetPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerifiedOtp, setIsVerifiedOtp] = useState(false);
    const [loading, setLoading] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const resetForm = () => {
        setEmail("");
        setOtp("");
        setPassword("");
        setIsOtpSent(false);
        setIsVerifiedOtp(false);
    };

    const handleSubmitEmail = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post(`${backendUrl}/auth/forget-password`, {
                email,
            });

            if (response.status === 200) {
                setIsOtpSent(true);
                toast.success(
                    response?.data?.message || "OTP sent successfully to your email.",
                );
            }
        } catch (err) {
            console.log(err);
            toast.error(
                err?.response?.data?.msg ||
                err?.response?.data?.message ||
                "Failed to send OTP.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitOtp = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post(`${backendUrl}/auth/verify-otp`, {
                email,
                otp,
            });

            if (response.status === 200) {
                setIsVerifiedOtp(true);
                toast.success(
                    response?.data?.message || "OTP verified. Set your new password.",
                );
            }
        } catch (err) {
            toast.error(
                err?.response?.data?.msg ||
                err?.response?.data?.message ||
                "Invalid OTP.",
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();

        try {

            setLoading(true);
            const response = await axios.post(`${backendUrl}/auth/generate-password`, {
                email,
                password,
            });

            if (response.status === 200) {
                toast.success(
                    response?.data?.message || "Password reset successfully.",
                );
                resetForm();
                navigate("/auth");
            }
        } catch (err) {
            toast.error(
                err?.response?.data?.msg ||
                err?.response?.data?.message ||
                "Failed to reset password.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <ToastContainer position="top-center" />

            <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
                <h2 className="mb-2 text-center text-2xl font-bold text-gray-800">
                    Reset Password
                </h2>
                <p className="mb-6 text-center text-sm text-gray-500">
                    {!isOtpSent
                        ? "Enter your email to receive an OTP."
                        : !isVerifiedOtp
                            ? "Enter the OTP sent to your email."
                            : "Create a new password for your account."}
                </p>

                {!isOtpSent && (
                    <form onSubmit={handleSubmitEmail} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-green-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-md bg-green-600 px-4 py-2 text-white disabled:bg-gray-400 cursor-pointer"
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                    </form>
                )}

                {isOtpSent && !isVerifiedOtp && (
                    <form onSubmit={handleSubmitOtp} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Enter OTP
                            </label>
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                maxLength={6}
                                placeholder="6 digit OTP"
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-center tracking-[0.35em] outline-none focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400 cursor-pointer"
                        >
                            {loading ? "Verifying OTP..." : "Verify OTP"}
                        </button>
                    </form>
                )}

                {isOtpSent && isVerifiedOtp && (
                    <form onSubmit={handleChangePassword} className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                placeholder="Enter new password"
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-green-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-md bg-green-600 px-4 py-2 text-white disabled:bg-gray-400"
                        >
                            {loading ? "Updating Password..." : "Reset Password"}
                        </button>
                    </form>
                )}

                <div className="mt-5 text-center text-sm text-gray-500 cursor-pointer">
                    <Link to="/auth" className="text-green-600">
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotResetPassword;
