import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTransactions } from "../context/TransactionContext.jsx";

const COLORS = ["#4CAF50", "#2196F3", "#FF9800", "#9C27B0", "#F44336"];

function Dashboard() {
  const { transactions, loading } = useTransactions();

  if (loading) {
    return <p className="p-6">Chargement...</p>;
  }

  // Revenus / Dépenses
  const revenus = transactions
    .filter((t) => t.type === "revenu")
    .reduce((sum, t) => sum + Number(t.montant), 0);

  const depenses = transactions
    .filter((t) => t.type === "depense")
    .reduce((sum, t) => sum + Number(t.montant), 0);

  const solde = revenus - depenses;

  // Dépenses par catégorie
  const depensesParCategorie = {};

  transactions.forEach((t) => {
    if (t.type === "depense") {
      const nom = t.categorie?.nom || "Autre";
      depensesParCategorie[nom] =
        (depensesParCategorie[nom] || 0) + Number(t.montant);
    }
  });

  const dataChart = Object.entries(depensesParCategorie).map(
    ([name, value]) => ({ name, value })
  );

  // Alertes simples (80%)
  const alerts = dataChart
    .map((d) => ({
      categorie: d.name,
      taux: (d.value / 100000) * 100, // budget fictif
    }))
    .filter((a) => a.taux >= 80);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white p-8 gap-10">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-blue-700">Dashboard Budget</h1>
        <p>
          {new Date().toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </header>

      {/* CARTES */}
      <section className="flex gap-6">
        <div className="shadow rounded-xl p-6 w-40 text-center">
          <h3>Revenus</h3>
          <p className="text-green-600 font-bold">
            {revenus.toLocaleString()} FCFA
          </p>
        </div>

        <div className="shadow rounded-xl p-6 w-40 text-center">
          <h3>Dépenses</h3>
          <p className="text-red-600 font-bold">
            {depenses.toLocaleString()} FCFA
          </p>
        </div>

        <div className="shadow rounded-xl p-6 w-40 text-center">
          <h3>Solde</h3>
          <p className="text-blue-700 font-bold">
            {solde.toLocaleString()} FCFA
          </p>
        </div>
      </section>

      {/* GRAPHE */}
      <section className="w-full max-w-lg">
        <h2 className="font-semibold mb-2">Dépenses par catégorie</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={dataChart} dataKey="value" outerRadius={80}>
              {dataChart.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </section>

      {/* ALERTES */}
      <section className="w-full max-w-lg">
        <h2 className="font-semibold mb-2">Alertes</h2>
        {alerts.length === 0 && (
          <p className="text-green-600">✅ Aucun dépassement</p>
        )}
        {alerts.map((a, i) => (
          <p key={i} className="text-orange-500">
            ⚠️ {a.categorie} à {Math.round(a.taux)}%
          </p>
        ))}
      </section>
    </div>
  );
}

export default Dashboard;
