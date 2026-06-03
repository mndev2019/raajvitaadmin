import { useState } from "react";
import axios from "axios";
import logo from "../assets/Images/logo.jpeg";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Base_Url } from "../API/Base_Url";

function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${Base_Url}/login`,
        formData
      );

      // Success
      toast.success(response.data.message);

      // Save Token
      localStorage.setItem("token", response.data.token);

      // Redirect
      navigate('/');

    } catch (error) {

      toast.error(
        error.response?.data?.message || "Login failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#faf7f2] relative overflow-hidden flex items-center justify-center px-6 py-5">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4a63f]/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8b1e2d]/10 blur-3xl rounded-full"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white border border-[#ecd9b0] rounded-[35px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8 md:p-10">

        {/* Logo */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Rajvita Logo"
            className="w-28 md:w-32 object-contain"
          />
        </div>

        {/* Heading */}
        <div className="text-center mt-6">
          <p className="text-[#5e4b42] mt-3 leading-7">
            Secure access for Raajvita Vista Developers administration.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-6"
        >

          {/* Email */}
          <div>
            <label className="block text-[#3c0d12] font-medium mb-3">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-14 px-5 rounded-2xl border border-[#ecd9b0] bg-[#faf7f2] focus:outline-none focus:border-[#c89b3c] text-[#3c0d12] placeholder:text-[#8d7b72]"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[#3c0d12] font-medium mb-3">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full h-14 px-5 rounded-2xl border border-[#ecd9b0] bg-[#faf7f2] focus:outline-none focus:border-[#c89b3c] text-[#3c0d12] placeholder:text-[#8d7b72]"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-[#3c0d12] hover:bg-[#4e1218] text-white font-semibold text-lg transition-all duration-300 shadow-lg disabled:opacity-70"
          >
            {
              loading
                ? "Please Wait..."
                : "Login"
            }
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-[#8d7b72]">
            Raajvita Vista Developers Pvt. Ltd.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;