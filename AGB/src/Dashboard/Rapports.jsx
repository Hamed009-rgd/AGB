import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useTransactions } from "../context/TransactionContext.jsx";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336"];

function Rapports() {
  const { transactions, loading } = useTransactions();

  if (loading) return <p className="p-6 text-gray-700">Chargement...</p>;

  if (!transactions || transactions.length === 0)
    return <p className="p-6 text-gray-600">Aucune transaction enregistrée.</p>;

  // 🔹 Revenus / Dépenses / Solde
  const revenus = transactions
    .filter((t) => t.type === "revenu")
    .reduce((sum, t) => sum + Number(t.montant), 0);

  const depenses = transactions
    .filter((t) => t.type === "depense")
    .reduce((sum, t) => sum + Number(t.montant), 0);

  const solde = revenus - depenses;

  // 🔹 Dépenses par catégorie
  const depensesParCategorie = {};
  transactions.forEach((t) => {
    if (t.type === "depense") {
      const nom = t.categorie?.nom || "Autre";
      depensesParCategorie[nom] = (depensesParCategorie[nom] || 0) + Number(t.montant);
    }
  });

  const dataChart = Object.entries(depensesParCategorie).map(([name, value]) => ({ name, value }));

  // 🔹 Alertes : catégorie dépassant les revenus
  const alertes = dataChart
    .map((d) => ({
      categorie: d.name,
      taux: (d.value / revenus) * 100, // % par rapport aux revenus
    }))
    .filter((a) => a.taux >= 100); // alerte si dépassement total revenu

  // 🔹 Format FCFA
  const formatCFA = (v) => `${v.toLocaleString("fr-FR")} FCFA`;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">📊 Rapports Financiers</h1>

      {/* Résumé général */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-100 p-4 rounded shadow text-center">
          <h3>Revenus</h3>
          <p className="text-2xl font-bold text-green-800">{formatCFA(revenus)}</p>
        </div>
        <div className="bg-red-100 p-4 rounded shadow text-center">
          <h3>Dépenses</h3>
          <p className="text-2xl font-bold text-red-800">{formatCFA(depenses)}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded shadow text-center">
          <h3>Solde</h3>
          <p className="text-2xl font-bold text-blue-800">{formatCFA(solde)}</p>
        </div>
      </section>

      {/* Graphique dépense par catégorie */}
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Dépenses par catégorie</h2>
        {dataChart.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={dataChart} dataKey="value" outerRadius={100} label>
                {dataChart.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatCFA(v)} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-600">Aucune dépense enregistrée</p>
        )}
      </section>

      {/* Alertes */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Alertes</h2>
        {alertes.length === 0 ? (
          <p className="text-green-600 font-medium">✅ Aucun dépassement</p>
        ) : (
          alertes.map((a, i) => (
            <p key={i} className="text-red-700 font-semibold">
              ❗ Dépenses dans {a.categorie} dépassent vos revenus ({Math.round(a.taux)}%)
            </p>
          ))
        )}
      </section>

      {/* Transactions */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Transactions</h2>
        <ul className="space-y-2">
          {transactions.map((t) => (
            <li
              key={t.id}
              className={`p-2 rounded shadow ${
                t.type === "revenu" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <span className="font-medium">{t.type}</span> — {t.categorie?.nom || "Global"} —{" "}
              {formatCFA(Number(t.montant))} — {t.date}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Rapports;
