import { FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NavModal = ({ setMenuOpen, navTitle }) => {
  const location = useLocation();

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={() => setMenuOpen(false)}
      ></div>

      <div className="fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-emerald-600">Menu</h2>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-2xl text-gray-600"
            aria-label="Close Menu"
          >
            <FiX />
          </button>
        </div>

        <ul className="flex flex-col gap-4 font-inter font-semibold text-lg">
          {navTitle.map(({ url, title }, index) => (
            <li key={index}>
              <Link
                to={url}
                onClick={() => setMenuOpen(false)}
                className={`block transition-colors duration-300 hover:text-emerald-600 ${
                  url === location.pathname
                    ? "text-emerald-700 font-semibold"
                    : "text-gray-800"
                }`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default NavModal;
