import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // pour animations dynamiques

function Acceuil() {
  const navigate = useNavigate();
  const handleClick = () => navigate("/Formulaire");

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-400 overflow-hidden">
      
      {/* Fond animé léger */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-white/15 rounded-full animate-pulse delay-2000"></div>
      </div>

      {/* Contenu central */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-8 sm:px-16 py-24 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl max-w-lg w-full space-y-8"
      >

        {/* TITRE */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="text-4xl sm:text-5xl font-extrabold text-blue-800 leading-snug"
        >
          Bienvenue sur <span className="text-emerald-500">AGB</span>
        </motion.h1>

        {/* SOUS-TEXTE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-slate-100 text-lg sm:text-xl leading-relaxed"
        >
          Gérez vos revenus, dépenses et budgets facilement, avec un tableau de bord intelligent et intuitif.
        </motion.p>

        {/* BOUTON */}
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            w-full sm:w-auto
            px-10 py-4
            bg-gradient-to-r from-blue-600 to-blue-700
            hover:from-blue-700 hover:to-blue-800
            text-white
            font-semibold
            rounded-2xl
            shadow-xl
            transition
            duration-300
          "
        >
          Commencer
        </motion.button>
      </motion.div>
    </section>
  );
}

export default Acceuil;