import './styles/Acceuil.css'
import { useNavigate } from 'react-router'
function Acceuil(){
    const navigate=useNavigate()
    const handleClick =()=>{
        navigate('/Formulaire')

    }
    return(
        <>
        <section className="debut">
            <h1>Bienvenu sur AGB</h1>
            <button type='button' onClick={handleClick} >Start</button>
        </section>
        </>
    )
}

export default Acceuil