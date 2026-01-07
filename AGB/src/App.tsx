import { Routes, Route, Link } from 'react-router-dom';
import Acceuil from './composant/Acceuil.jsx';
import Formulaire from './composant/Formulaire.jsx';
import Inscription from './composant/Inscription.jsx'


function App() {
  return (
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/formulaire" element={<Formulaire />} />
        <Route path="/inscription" element={<Inscription />} />
      </Routes>
  );
}

export default App;

