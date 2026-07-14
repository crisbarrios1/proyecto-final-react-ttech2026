import { Link } from "react-router-dom"
import "./Footer.css"

export const Footer = () => {
    return(
        <footer>
            <p>Sitio desarrollado por Cristian Barrios</p>
            <nav>
                <ul className="nav-list">
                    <li>
                        <Link to={"https://www.whatsapp.com"} target={"_blank"}>Whatsapp</Link>
                    </li>
                    <li>
                        <Link to={"https://www.instagram.com"} target={"_blank"}>Instagram</Link>                    </li>
                </ul>
            </nav>
        </footer>
    )
}