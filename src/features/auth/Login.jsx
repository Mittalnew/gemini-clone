import React, { useEffect, useState,useRef  } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaKey, FaFlag } from "react-icons/fa";
import Button from "../../components/Button";

const schema = z
  .object({
    countryCode: z.string().min(1, "Please select a country code."),
    phone: z
      .string()
      .min(5, "Phone number must be at least 5 digits.")
      .max(15, "Phone number cannot exceed 15 digits.")
      .regex(/^\d+$/, "Phone number must contain only digits."),
    otp: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.otpSent && (!data.otp || data.otp.length < 4)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please enter a valid OTP.",
        path: ["otp"],
      });
    }
  });

const Login = () => {
  const fetchCalled = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [countries, setCountries] = useState([]);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      countryCode: "",
      phone: "",
      otp: "",
    },
    context: { otpSent },
  });

  useEffect(() => {
    if (fetchCalled.current) return; 
     fetchCalled.current = true;
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v2/all");
        const formatted = res.data
          .map((c) => ({
            name: c.name,
            code: c.callingCodes?.[0] ? "+" + c.callingCodes[0] : "",
          }))
          .filter((c) => c.code)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(formatted);
        const defaultCode =
          formatted.find((c) => c.code === "+91") || formatted[0];
        setValue("countryCode", defaultCode.code);
      } catch {
        toast.error("Failed to load countries.");
        const fallback = [
          { name: "India", code: "+91" },
          { name: "United States", code: "+1" },
          { name: "United Kingdom", code: "+44" },
        ];
        setCountries(fallback);
        setValue("countryCode", "+91");
      }
    };

    fetchCountries();
  }, []);

  const onSubmit = async (data) => {
    if (!otpSent) {
      setIsSendingOtp(true);
      clearErrors("otp");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setOtpSent(true);
        toast.success(`OTP sent to ${data.countryCode}${data.phone}`);

        setTimeout(() => {
          toast.info("OTP: 123456 (demo)");
          setValue("otp", "123456", { shouldValidate: true });
        }, 1000);
      } catch {
        toast.error("Failed to send OTP.");
      } finally {
        setIsSendingOtp(false);
      }
    } else {
      setIsVerifyingOtp(true);
      try {
        if (data.otp !== "123456") {
          setError("otp", {
            type: "manual",
            message: "Invalid OTP. Please try again.",
          });
          toast.error("Invalid OTP.");
          return;
        }

        await new Promise((resolve) => setTimeout(resolve, 1500));
        dispatch(
          login({ phoneNumber: data.phone, countryCode: data.countryCode })
        );
        toast.success("Logged in successfully!");
        navigate("/dashboard");
      } catch {
        toast.error("Login failed.");
      } finally {
        setIsVerifyingOtp(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-850 p-4 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-blue-200 dark:bg-blue-900 opacity-30 rounded-xl blur-3xl z-0 scale-105" />
        <div className="absolute inset-0 bg-purple-200 dark:bg-purple-900 opacity-30 rounded-xl blur-3xl z-0 scale-95 translate-x-10 translate-y-10" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl w-full space-y-6 border border-gray-200 dark:border-gray-700 z-10"
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white">
            Welcome to Gemini Chat
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
            Enter your phone number to get started.
          </p>

          <div>
            <label
              htmlFor="countryCode"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Country Code
            </label>
            <div className="relative">
              <FaFlag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <select
                id="countryCode"
                {...register("countryCode")}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.countryCode
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <option value="">Select Code</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>
            {errors.countryCode && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.countryCode.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Phone Number
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                id="phone"
                type="tel"
                placeholder="e.g., 9876543210"
                {...register("phone")}
                className={`w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.phone.message}
              </p>
            )}
          </div>

          {otpSent && (
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                One-Time Password (OTP)
              </label>
              <div className="relative">
                <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  {...register("otp")}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.otp
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                />
              </div>
              {errors.otp && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.otp.message}
                </p>
              )}
            </div>
          )}

          <Button
            isSendingOtp={isSendingOtp}
            isVerifyingOtp={isVerifyingOtp}
            otpSent={otpSent}
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
