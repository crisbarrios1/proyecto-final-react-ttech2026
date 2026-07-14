import { useNavigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProductFormContainer.css";
import { ProductFormUI } from "./ProductFormUI"
import { validateProduct } from "../../utils/validateProduct"
import { uploadImage } from "../../services/uploadImage"
import { createProduct, getProductById, updateProduct, deleteProduct } from "../../services/productsService";

export const ProductFormContainer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);
    const [password, setPassword] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        image: "",
    });

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            loadProduct(id);
        }
    }, [id]);

    const loadProduct = async (productId) => {
        try {
            const data = await getProductById(productId);
            if (data) {
                setProduct({
                    name: data.name || "",
                    price: data.price || "",
                    category: data.category || "",
                    description: data.description || "",
                    image: data.image || "",
                });
            }
        } catch (error) {
            console.error("Error al cargar producto:", error);
        }
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === "admin123") {
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
            let imageUrl = product.image;
            if (file) {
                imageUrl = await uploadImage(file);
            }

            const productData = {
                name: product.name,
                price: Number(product.price),
                category: product.category,
                description: product.description,
                image: imageUrl,
            }

            if (isEditing && id) {
                await updateProduct(id, productData);
                alert("Producto actualizado ✅");
                navigate("/admin/list");
                return;
            }

            const newId = await createProduct(productData);
            setProduct({name: "", price:"", category:"", description:""})
            setFile(null);
            navigate(`/success/${newId}`, { replace: true });

        }catch(error){
            setErrors({ general: error.message})
        }finally{
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!id) return;
        if (window.confirm("¿Estás seguro de eliminar este producto?")) {
            try {
                await deleteProduct(id);
                alert("Producto eliminado ✅");
                navigate("/admin/list");
            } catch (error) {
                alert("Error al eliminar el producto");
            }
        }
    };

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
        <>
            <ProductFormUI
                product={product}
                errors={errors}
                loading={loading}
                onChange={handleChange}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
                isEditing={isEditing}
                onDelete={handleDelete}
            />
            <div className="admin-list-link">
                <Link to="/admin/list" className="btn-list">
                    📋 Ver todos los productos
                </Link>
            </div>
        </>
    )
};