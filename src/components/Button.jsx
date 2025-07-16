import { FaPaperPlane, FaSignInAlt } from "react-icons/fa";

const Button = ({ isSendingOtp, isVerifyingOtp, otpSent }) => {
  return (
    <button
      type="submit"
      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      disabled={isSendingOtp || isVerifyingOtp}
    >
      {isSendingOtp && <FaPaperPlane className="animate-pulse" />}
      {isVerifyingOtp && <FaSignInAlt className="animate-spin" />}
      {!otpSent && !isSendingOtp && "Send OTP"}
      {otpSent && !isVerifyingOtp && "Verify OTP"}
      {(isSendingOtp || isVerifyingOtp) &&
        (isSendingOtp ? "Sending OTP..." : "Verifying...")}
    </button>
  );
};

export default Button;
