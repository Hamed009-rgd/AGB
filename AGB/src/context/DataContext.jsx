import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const BASE_URL = "https://api.react.nos-apps.com/api/groupe-7";

  // Récupérer le token stocké
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    // Fetch Transactions
    fetch(`${BASE_URL}/transactions`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setTransactions(data.data || []))
      .catch(err => {
        console.error("Erreur transactions", err);
        setTransactions([]);
      });

    // Fetch Categories
    fetch(`${BASE_URL}/categories`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setCategories(data.data || []))
      .catch(err => {
        console.error("Erreur categories", err);
        setCategories([]);
      });
  }, [token]);

  // Persistance locale pour garder les données après refresh
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  return (
    <DataContext.Provider
      value={{
        transactions,
        setTransactions,
        categories,
        setCategories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
