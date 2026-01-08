import './Dashboardstyle/Nav.css'
import Tuggle from './Tuggle.jsx'

function Nav (){
    return(
       <header>
        <nav>
            <ul type="none" className="navigation">
                <li>logo</li>
                <li>Accueil</li>
                <li>Transactions</li>
                <li>Bubget</li>
                <li>Raports</li>
                <li>
                    <Tuggle />
                </li>
            </ul>
        </nav>
       </header> 
    )
}

export default Nav