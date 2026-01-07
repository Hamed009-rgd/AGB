import { useState } from 'react'
import './styles/formulaire.css'
import { useNavigate } from 'react-router-dom'

function Formulaire ()  {
    const [email,setEmail]=useState('')
    const [motdepasse,setMotdepasse]=useState('')
    const [message, setMessage] = useState('');
     const nav=useNavigate()

    const handleSubmit = async (e)=> {
        e.preventDefault();

        const user ={
            email: email,
            password: motdepasse

        }
        console.log('donnée', user)
     
     try {
      const res = await fetch('https://api.react.nos-apps.com/api/groupe-7/auth/login', {
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
        setMessage('connexion réussie ');
        nav("/Dashboard")
      } else {
        setMessage(data.message || 'Erreur ');
      }
    } catch (error) {
      console.error(error);
      setMessage('Erreur de connexion ');
    }
     }

     const navigate=useNavigate()
    
 const handleClick =()=>{
    navigate("/Inscription")

 }
    return(
        <>

            <div className="contenaire">

                <form className="form" onSubmit={handleSubmit}>
                    <h2>connexion</h2>
                    <input type="email" 
                        placeholder="Votre mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        required
                    />
                    <input type="password" 
                        placeholder="votre mot de passe" 
                        value={motdepasse}
                        onChange={(e) => setMotdepasse(e.target.value)}
                        required
                    />
                    <button className="btn-formulaire" type="submit">valider</button>
                    <button className="btn" type='button' onClick={handleClick}>inscrivez-vous</button>
                </form>
            </div>
        </>
    )

}

export default Formulaire