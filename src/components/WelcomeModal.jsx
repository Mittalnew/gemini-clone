import React from "react";
import { FaRocket, FaRegGem } from "react-icons/fa";

const WelcomeModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white p-8 rounded-2xl shadow-2xl w-[95%] max-w-lg text-center space-y-6 transform transition-all duration-300 hover:scale-105">
        <div className="flex justify-center">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
            <FaRegGem className="h-12 w-12 text-blue-600 dark:text-blue-300" />
          </div>
        </div>
        <h2 className="text-3xl font-bold">👋 Welcome!</h2>
        <p className="text-lg font-medium flex items-center justify-center">
          <FaRocket className="mr-2" /> Welcome to Gemini Chatroom
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          We're excited to have you here. Let's get started on this amazing journey!
        </p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default WelcomeModal;
