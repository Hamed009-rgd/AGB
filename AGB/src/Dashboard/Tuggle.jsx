import { useState, useRef, useEffect } from "react";
import Deconnexion from './Deconnexion';

function Tuggle() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Toggle ouverture du menu
  const toggleMenu = () => setOpen(!open);

  // Fermer le menu quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
      >
        Profil ▼
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Mon compte</li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Deconnexion />
          </li>
        </ul>
      )}
    </div>
  );
}

export default Tuggle;
