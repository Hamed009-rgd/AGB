import { useNavigate } from "react-router-dom";

function Deconnexion(){

  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Supprimer le token
    localStorage.removeItem("token");

    // 2. Redirection vers login
    navigate("/");
  };

  return (
    <button onClick={handleLogout}>
      Déconnexion
    </button>
  );
}

export default Deconnexion
