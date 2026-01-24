import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Tuggle from "./Tuggle.jsx";
import Logo from "../public/img/AGB.png";

function Nav() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (location.pathname === "/") return null;

  return (
    <header className="bg-white border-b-2 border-blue-500 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo image */}
        <Link to="/" className="flex items-center">
          <img
            src={Logo}
            alt="Logo AGB"
            className="h-12 w-auto shadow-md"
          />
        </Link>

        {/* Menu desktop */}
        <ul className="hidden md:flex items-center gap-10 text-gray-800 font-medium">
          <li>
            <Link to="/dashboard" className="hover:text-blue-500 transition">
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/transaction" className="hover:text-blue-500 transition">
              Transactions
            </Link>
          </li>
          <li>
            <Link to="/categories" className="hover:text-blue-500 transition">
              Catégories
            </Link>
          </li>
          <li>
            <Link to="/statistique" className="hover:text-blue-500 transition">
              Statistiques
            </Link>
          </li>
          <li>
            <Link to="/rapports" className="hover:text-blue-500 transition">
              Rapports
            </Link>
          </li>
          <li>
            <Tuggle />
          </li>
        </ul>

        {/* Hamburger mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-800 text-2xl"
          >
            {open ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <ul className="md:hidden bg-white flex flex-col gap-3 p-6 text-gray-800 font-medium shadow-lg border-t border-blue-100">
          <li>
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="hover:text-blue-500 transition"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/transaction"
              onClick={() => setOpen(false)}
              className="hover:text-blue-500 transition"
            >
              Transactions
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              onClick={() => setOpen(false)}
              className="hover:text-blue-500 transition"
            >
              Catégories
            </Link>
          </li>
          <li>
            <Link
              to="/statistique"
              onClick={() => setOpen(false)}
              className="hover:text-blue-500 transition"
            >
              Statistiques
            </Link>
          </li>
          <li>
            <Link
              to="/rapports"
              onClick={() => setOpen(false)}
              className="hover:text-blue-500 transition"
            >
              Rapports
            </Link>
          </li>
          <li>
            <Tuggle />
          </li>
        </ul>
      )}
    </header>
  );
}

export default Nav;