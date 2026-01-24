import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTransactions } from "../../context/TransactionContext.jsx";

function Statistique() {
  const { transactions } = useTransactions();

  const [statsGeneral, setStatsGeneral] = useState({
    totalRevenus: 0,
    totalDepenses: 0,
    solde: 0,
  });

  const [statsCategorie, setStatsCategorie] = useState([]);

  // 🔹 Générer les catégories une seule fois avec useMemo
  const categories = useMemo(() => {
    return [
      ...new Set(transactions.map((t) => t.categorie?.nom || "Autres")),
    ].map((nom) => ({ nom }));
  }, [transactions]);

  useEffect(() => {
    if (!transactions.length) return;

    // 🔹 Statistiques générales
    const totalRevenus = transactions
      .filter((t) => t.type === "revenu")
      .reduce((sum, t) => sum + parseFloat(t.montant), 0);

    const totalDepenses = transactions
      .filter((t) => t.type === "depense")
      .reduce((sum, t) => sum + parseFloat(t.montant), 0);

    const solde = totalRevenus - totalDepenses;

    setStatsGeneral({ totalRevenus, totalDepenses, solde });

    // 🔹 Statistiques par catégorie
    const statsCat = categories.map((cat) => {
      const revenus = transactions
        .filter((t) => t.type === "revenu" && t.categorie?.nom === cat.nom)
        .reduce((sum, t) => sum + parseFloat(t.montant), 0);

      const depenses = transactions
        .filter((t) => t.type === "depense" && t.categorie?.nom === cat.nom)
        .reduce((sum, t) => sum + parseFloat(t.montant), 0);

      return { categorie: cat.nom, revenus, depenses, solde: revenus - depenses };
    });

    setStatsCategorie(statsCat);
  }, [transactions, categories]);

  const formatCFA = (value) => `${value.toLocaleString("fr-FR")} FCFA`;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-6xl mx-auto mt-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">📊 Statistiques</h1>

      {/* Stats générales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-green-700">Total Revenus</h2>
          <p className="text-xl font-bold text-green-900">{formatCFA(statsGeneral.totalRevenus)}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-red-700">Total Dépenses</h2>
          <p className="text-xl font-bold text-red-900">{formatCFA(statsGeneral.totalDepenses)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg shadow-md text-center">
          <h2 className="font-semibold text-blue-700">Solde</h2>
          <p className="text-xl font-bold text-blue-900">{formatCFA(statsGeneral.solde)}</p>
        </div>
      </div>

      {/* Graphique par catégorie */}
      {statsCategorie.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-6">
          <h2 className="font-semibold text-gray-700 mb-4">Dépenses/Revenus par catégorie</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statsCategorie} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="categorie" />
              <YAxis tickFormatter={formatCFA} />
              <Tooltip formatter={(value) => formatCFA(value)} />
              <Legend />
              <Bar dataKey="revenus" fill="#16a34a" name="Revenus" />
              <Bar dataKey="depenses" fill="#dc2626" name="Dépenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Tableau détaillé */}
      <div className="overflow-x-auto">
        <h2 className="font-semibold text-gray-700 mb-2">Détails par catégorie</h2>
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b text-left">Catégorie</th>
              <th className="py-2 px-4 border-b text-left">Revenus</th>
              <th className="py-2 px-4 border-b text-left">Dépenses</th>
              <th className="py-2 px-4 border-b text-left">Solde</th>
            </tr>
          </thead>
          <tbody>
            {statsCategorie.map((s) => (
              <tr key={s.categorie} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{s.categorie}</td>
                <td className="py-2 px-4 border-b text-green-700 font-semibold">{formatCFA(s.revenus)}</td>
                <td className="py-2 px-4 border-b text-red-700 font-semibold">{formatCFA(s.depenses)}</td>
                <td className="py-2 px-4 border-b text-blue-700 font-semibold">{formatCFA(s.solde)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Statistique;
