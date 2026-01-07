
import React, { useState } from 'react';
import './styles/Inscription.css'
function Inscription() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name: nom,
      email: email,
      password: motdepasse,
      password_confirmation: motdepasse, 
    };

    try {
        console.log('Données envoyées:', user);
      const res = await fetch('https://api.react.nos-apps.com/api/groupe-7/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log('Status:', res.status);
      console.log('Réponse:', data);
      if (res.ok) {
        setMessage('Inscription réussie ');
      } else {
        setMessage(data.message || 'Erreur ');
      }
    } catch (error) {
      console.error(error);
      setMessage('Echec d\'inscription ');
    }
  };

  return (
   <div className='contenaire'>
   <form className="fromulaire" onSubmit={handleSubmit}>
     <h2> Inscription </h2>
      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />
      <input
      type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={motdepasse}
        onChange={(e) => setMotdepasse(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={motdepasse}
        onChange={(e) => setMotdepasse(e.target.value)}
        required
      />
      <button className="btn-formulaire" type="submit">S'inscrire</button>

      {message && <p>{message}</p>}
    </form>
    </div>
  );

}

export default Inscription;