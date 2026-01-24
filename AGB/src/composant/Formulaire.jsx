import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Formulaire() {
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);

    try {
      const res = await fetch(
        "https://api.react.nos-apps.com/api/groupe-7/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password: motdepasse }),
        }
      );

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setSuccess(true);
        setMessage("Connexion réussie ✅");

        setTimeout(() => navigate("/dashboard"), 800);
      } else {
        setMessage(data.message || "Email ou mot de passe incorrect ❌");
      }
    } catch {
      setMessage("Erreur serveur ❌");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 overflow-hidden px-4">

      {/* Fond animé identique à l’accueil */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-white/15 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 animate-gradient-x"></div>
      </div>

      {/* Carte */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 space-y-10"
      >
        <h2 className="text-3xl font-extrabold text-slate-800 text-center">
          Connexion à <span className="text-blue-600">AGB</span>
        </h2>

        {message && (
          <p
            className={`text-center font-medium ${
              success ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="
              w-full
              px-5 py-6
              text-lg
              rounded-2xl
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              text-slate-800 placeholder-slate-400
            "
          />

          <motion.input
            type="password"
            placeholder="Mot de passe"
            value={motdepasse}
            onChange={(e) => setMotdepasse(e.target.value)}
            required
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="
              w-full
              px-5 py-6
              text-lg
              rounded-2xl
              border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              text-slate-800 placeholder-slate-400
            "
          />

          {/* Bouton très petit */}
          <div className="flex justify-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
                px-6 py-2
                text-sm
                bg-blue-700 hover:bg-blue-800
                text-white font-semibold
                rounded-full
                shadow-md
                transition
              "
            >
              Connexion
            </motion.button>
          </div>
        </form>

        <p className="text-center text-sm text-slate-600">
          Pas encore de compte ?{" "}
          <span
            onClick={() => navigate("/inscription")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            S’inscrire
          </span>
        </p>
      </motion.div>

      {/* Animation gradient – style React pur, pas jsx */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
      `}</style>
    </section>
  );
}

export default Formulaire;
