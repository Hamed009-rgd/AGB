import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Categories() {
  const BASE_URL = "https://api.react.nos-apps.com/api/groupe-7/categories";

  // Headers avec token
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const [categories, setCategories] = useState([]);
  const [nom, setNom] = useState("");
  const [type, setType] = useState("revenu"); // valeur par défaut valide
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [details, setDetails] = useState(null);

  // Charger les catégories
  const loadCategories = async () => {
    try {
      const res = await fetch(BASE_URL, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Erreur de chargement des catégories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Ajouter ou modifier
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!nom.trim() || !type.trim()) {
      setMessage("Nom et type obligatoires !");
      return;
    }

    // Préparer le body
    const body = {
      nom: nom.trim(),
      type: type.trim().toLowerCase(), // normalisation "revenu" ou "depense"
    };

    try {
      let res;
      if (editingId) {
        res = await fetch(`${BASE_URL}/${editingId}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch(BASE_URL, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(body),
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur API");

      setNom("");
      setType("revenu");
      setEditingId(null);
      setMessage(editingId ? "Catégorie modifiée !" : "Catégorie ajoutée !");
      loadCategories();
    } catch (err) {
      setMessage(err.message);
    }
  };

  // Supprimer
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette catégorie ?")) return;
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("Impossible de supprimer");
      setMessage("Catégorie supprimée !");
      loadCategories();
    } catch (err) {
      setMessage(err.message);
    }
  };

  // Pré-remplir le formulaire pour modifier
  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setNom(cat.nom);
    setType(cat.type);
    setMessage("Modification en cours...");
  };

  // Afficher les détails
  const handleDetails = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("Impossible de récupérer les détails");
      const data = await res.json();
      setDetails(data);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des Catégories</h1>
      {message && <p className="text-red-600 mb-4">{message}</p>}

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 mb-6 items-center"
      >
        <input
          type="text"
          placeholder="Nom de la catégorie"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          className="border rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="revenu">Revenu</option>
          <option value="depense">Dépense</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editingId ? "Modifier" : "Ajouter"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setNom("");
              setType("revenu");
              setMessage("");
            }}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Annuler
          </button>
        )}
      </form>

      {/* Liste des catégories */}
      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center border rounded p-3 shadow-sm hover:shadow-md transition"
          >
            <div>
              <strong>{cat.nom}</strong> — {cat.type}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(cat)}
                className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500 transition text-white"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 transition text-white"
              >
                Supprimer
              </button>
              <button
                onClick={() => handleDetails(cat.id)}
                className="bg-blue-500 px-2 py-1 rounded hover:bg-blue-600 transition text-white"
              >
                Détails
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Détails */}
      {details && (
        <div className="mt-6 border rounded p-4 shadow-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Détails de la catégorie</h3>
          <p><strong>Nom :</strong> {details.nom}</p>
          <p><strong>Type :</strong> {details.type}</p>
          <button
            onClick={() => setDetails(null)}
            className="mt-2 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition"
          >
            Fermer
          </button>
        </div>
      )}

      {/* Lien vers autres pages */}
      <div className="mt-6 flex gap-3">
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          Retour au Dashboard
        </Link>
        <Link to="/transaction" className="text-blue-600 hover:underline">
          Voir Transactions
        </Link>
        <Link to="/statistique" className="text-blue-600 hover:underline">
          Statistiques
        </Link>
      </div>
    </div>
  );
}

export default Categories;
