import './Dashboardstyle/Tuggle.css'
import { useState, useRef, useEffect } from "react";

function Tuggle (){
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
    <div className="profile-menu" ref={menuRef}>
      <button className="profile-btn" onClick={toggleMenu}>
        Profil ▼
      </button>
      {open && (
        <ul className="dropdown">
          <li>Mon compte</li>
          <li>Paramètres</li>
          <li>Déconnexion</li>
        </ul>
      )}
    </div>
  );
}

export default Tuggle