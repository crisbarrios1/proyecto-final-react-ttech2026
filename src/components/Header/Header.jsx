import { Link } from "react-router-dom"
import logo from "../../assets/logoCarrito.png"
import { Nav } from "../Nav/Nav"
import "./Header.css"

export const Header = () => {
    return (
    <header>
        <div className="logo-container">
            <Link to={"/"}>
                <img src={ logo } alt="Logo React" />
                <span>Mi Market</span>
            </Link>
        </div>
        <Nav />
    </header>
    )
}