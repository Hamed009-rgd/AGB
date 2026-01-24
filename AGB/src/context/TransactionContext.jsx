import { createContext, useContext, useEffect, useState } from "react";

const TransactionContext = createContext();

const BASE_URL =
  "https://api.react.nos-apps.com/api/groupe-7/transactions";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔄 Charger toutes les transactions
  async function fetchTransactions() {
    setLoading(true);
    try {
      const res = await fetch(BASE_URL, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      setTransactions(
        (data.data || []).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
      );
    } catch (err) {
      setError("Impossible de charger les transactions");
    } finally {
      setLoading(false);
    }
  }

  // ➕ Ajouter
  async function addTransaction(body) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Erreur ajout transaction");

    // 🔥 recharge tout → Dashboard & Stats à jour
    await fetchTransactions();
  }

  // ✏️ Modifier
  async function updateTransaction(id, body) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Erreur modification transaction");

    await fetchTransactions();
  }

  // ❌ Supprimer
  async function deleteTransaction(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Erreur suppression transaction");

    await fetchTransactions();
  }

  // ⏬ Chargement initial
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        error,
        fetchTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}