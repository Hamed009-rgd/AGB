import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTransactions } from "../../context/TransactionContext.jsx";

function Transactions() {
  const {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  } = useTransactions();

  const [montant, setMontant] = useState("");
  const [categorieId, setCategorieId] = useState("");
  const [type, setType] = useState("revenu");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Catégories uniques
  const uniqueCategories = [
    ...new Map(
      transactions.map((t) => [t.categorie?.id, t.categorie])
    ).values(),
  ].filter(Boolean);

  function resetForm() {
    setMontant("");
    setCategorieId("");
    setType("revenu");
    setDescription("");
    setDate("");
    setEditId(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!montant || parseFloat(montant) <= 0)
      return setError("Montant invalide");
    if (!categorieId) return setError("Catégorie obligatoire");
    if (!type) return setError("Type obligatoire");
    if (!date) return setError("Date obligatoire");

    const body = {
      montant: parseFloat(montant),
      categorie_id: parseInt(categorieId),
      type,
      description,
      date,
    };

    try {
      if (editId) {
        await updateTransaction(editId, body);
        setSuccess("Transaction modifiée !");
      } else {
        await addTransaction(body);
        setSuccess("Transaction ajoutée !");
      }
      resetForm();
    } catch (err) {
      setError("Erreur lors de l’enregistrement");
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Supprimer cette transaction ?")) return;
    await deleteTransaction(id);
    setSuccess("Transaction supprimée !");
  }

  function handleEdit(trans) {
    setMontant(trans.montant);
    setCategorieId(trans.categorie_id);
    setType(trans.type);
    setDescription(trans.description || "");
    setDate(trans.date?.split("T")[0] || "");
    setEditId(trans.id);
    setSuccess("");
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>

      {error && <p className="bg-red-100 text-red-700 p-2 rounded">{error}</p>}
      {success && (
        <p className="bg-green-100 text-green-700 p-2 rounded">{success}</p>
      )}

      {/* FORMULAIRE */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 bg-white p-4 rounded-xl shadow-md"
      >
        <input
          type="number"
          placeholder="Montant (FCFA)"
          value={montant}
          onChange={(e) => setMontant(e.target.value)}
          className="flex-1 p-3 rounded border"
        />

        <select
          value={categorieId}
          onChange={(e) => setCategorieId(e.target.value)}
          className="flex-1 p-3 rounded border"
        >
          <option value="">-- Catégorie --</option>
          {uniqueCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="flex-1 p-3 rounded border"
        >
          <option value="revenu">Revenu</option>
          <option value="depense">Dépense</option>
        </select>

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="flex-1 p-3 rounded border"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 p-3 rounded border"
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          {editId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      {/* LISTE */}
      <ul className="space-y-3">
        <AnimatePresence>
          {transactions.map((trans) => (
            <motion.li
              key={trans.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`flex justify-between items-center p-4 rounded-xl ${
                trans.type === "revenu" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div>
                <strong>{trans.categorie?.nom}</strong> —{" "}
                {trans.montant.toLocaleString()} FCFA —{" "}
                {new Date(trans.date).toLocaleDateString("fr-FR")}
              </div>

              <div className="flex gap-2">
                <button onClick={() => handleEdit(trans)}>✏️</button>
                <button onClick={() => handleDelete(trans.id)}>❌</button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

export default Transactions;
