import { Link } from "react-router-dom"
import logo from "../../assets/logoCarrito.png"
import "./Header.css"

export const Header = () => {
    return (
        <header>
            <div className="logo-container">
                <Link to={"/"}>
                    <img src={logo} alt="Logo React" />
                    <span>Mi Market</span>
                </Link>
            </div>
            <nav className="nav-right">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/carrito" className="nav-link">Carrito</Link>
                <Link to="/admin" className="admin-btn"> 🔒 Admin</Link>
            </nav>
        </header>
    )
}