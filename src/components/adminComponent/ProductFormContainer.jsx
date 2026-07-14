import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./ProductFormContainer.css";
import { ProductFormUI } from "./ProductFormUI"
import { validateProduct } from "../../utils/validateProduct"
import { uploadImage } from "../../services/uploadImage"
import { createProduct } from "../../services/productsService";

export const ProductFormContainer = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
    });

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === "admin123") {   // contraseña para el panel de admin
            setIsAuthorized(true);
            setPassword("");
        } else {
            alert("Contraseña incorrecta");
            setPassword("");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target 
        setProduct({ ...product, [name]: value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0] || null
        setFile(file)        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors({})
        setLoading(true)

        const newErrors = validateProduct({...product, file})
        if (Object.keys(newErrors).length > 0){
            setErrors(newErrors)
            setLoading(false)
            return
        }

        try{
            const imageUrl = await uploadImage(file)
            const productData = {
            ...product,
            price: Number(product.price),
            image: imageUrl,
            }

            const id = await createProduct(productData)

            setProduct({name: "", price:"", category:"", description:""})
            setFile(null);
            navigate(`/success/${id}`, { replace: true });

        }catch(error){
            setErrors({ general: error.message})
        }finally{
            setLoading(false)
        }

    }

    if (!isAuthorized) {
        return (
            <section className="admin-login">
                <h2>Acceso al panel de administración</h2>
                <p>Ingresa la contraseña para continuar</p>
                <form onSubmit={handlePasswordSubmit} className="admin-login-form">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                    />
                    <button type="submit" className="btn primary">
                        Ingresar
                    </button>
                </form>
            </section>
        )
    }

    return(
        <ProductFormUI
            product = {product}
            errors = {errors}
            loading = {loading}
            onChange = {handleChange}
            onFileChange = {handleFileChange}
            onSubmit = {handleSubmit}
        />
    )
};