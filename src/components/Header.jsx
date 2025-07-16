import { FiMenu, FiX } from "react-icons/fi";
import NavModal from "../modals/NavModal";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navTitle = [
    { url: "/", title: "Home" },
    { url: "/about", title: "About" },
    { url: "/currencies", title: "Convert" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-600">CurrencySwift</h1>

        <ul className="hidden md:flex items-center space-x-6 xl:space-x-8 font-inter font-semibold text-sm xl:text-base">
          {navTitle.map(({ url, title }, index) => (
            <li key={index}>
              <Link
                to={url}
                className={`transition-colors duration-300 hover:text-emerald-600 ${
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

        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden text-2xl text-slate-700"
          aria-label="Toggle Menu"
        >
          <FiMenu />
        </button>
      </div>

      {menuOpen && (
        <NavModal
          navTitle={navTitle}
          setMenuOpen={setMenuOpen}
        />
      )}
    </header>
  );
}
