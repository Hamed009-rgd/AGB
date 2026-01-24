import { Routes, Route } from "react-router-dom";
import Acceuil from "./composant/Acceuil.jsx";
import Formulaire from "./composant/Formulaire.jsx";
import Inscription from "./composant/Inscription.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Categories from "./Dashboard/Bubget/Categories.jsx";
import Transaction from "./Dashboard/Bubget/Transaction.jsx";
import Statistique from "./Dashboard/statistique/Statistique.jsx";
import Rapports from "./Dashboard/Rapports.jsx";
import Layout from "./composant/Layout.jsx";
import ErrorBoundary from "./Dashboard/ErrorBondary.jsx";

// **IMPORT DATA PROVIDER**
import { DataProvider } from "./context/DataContext.jsx";

function App() {
  return (
    <DataProvider>
      <Routes>
        {/* PAGE ACCUEIL (SANS NAVBAR) */}
        <Route path="/" element={<Acceuil />} />
        <Route path="/formulaire" element={<Formulaire />} />
        <Route path="/inscription" element={<Inscription />} />

        {/* PAGES AVEC NAVBAR */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ErrorBoundary>
                <Dashboard />
              </ErrorBoundary>
            }
          />
          <Route
            path="/categories"
            element={
              <ErrorBoundary>
                <Categories />
              </ErrorBoundary>
            }
          />
          <Route
            path="/transaction"
            element={
              <ErrorBoundary>
                <Transaction />
              </ErrorBoundary>
            }
          />
          <Route
            path="/statistique"
            element={
              <ErrorBoundary>
                <Statistique />
              </ErrorBoundary>
            }
          />
          <Route
            path="/rapports"
            element={
              <ErrorBoundary>
                <Rapports />
              </ErrorBoundary>
            }
          />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
