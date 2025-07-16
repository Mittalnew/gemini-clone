import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaInfoCircle } from "react-icons/fa";

const Navbar = () => {
  const [dark, setDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (dark) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const toggleDark = () => {
    setDark((prevDark) => !prevDark);
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-800 shadow text-black dark:text-white transition-colors duration-200">
      <div className="flex items-center gap-4 font-semibold text-lg relative">
        <span className="text-5xl font-bold bg-gradient-to-r from-yellow-300 to-blue-500 text-transparent bg-clip-text">
          G
        </span>
        <span className="text-gray-800 dark:text-white flex items-center gap-2">
          Gemini Chat Room

          {/* Info Icon with tooltip */}
          <div className="relative group">
            <FaInfoCircle
              className="text-gray-500 dark:text-gray-400 cursor-pointer"
              aria-label="Information"
            />

            {/* Tooltip */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-64 p-3 rounded-lg bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-50 shadow-lg">
              This is a chat app where you can create and delete chats,
              and chat with others in real-time.
              <br />
              <br />
              Features:
              <ul className="list-disc list-inside mt-1">
                <li>Multiple chat rooms</li>
                <li>Real-time messaging</li>
                <li>Dark mode support(soon...)</li>
                <li>Easy user management</li>
              </ul>
            </div>
          </div>
        </span>
      </div>

      <button
        onClick={toggleDark}
        className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200
                   flex items-center justify-center w-10 h-10"
        aria-label="Toggle Dark Mode"
      >
        {dark ? (
          <FaSun size={20} className="text-yellow-500" />
        ) : (
          <FaMoon size={20} className="text-gray-600" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
