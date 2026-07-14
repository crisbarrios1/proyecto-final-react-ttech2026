import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productsService";
import "./AdminProductList.css";

export const AdminProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar este producto?")) {
            try {
                await deleteProduct(id);
                alert("Producto eliminado ✅");
                loadProducts();
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    if (loading) return <p>Cargando...</p>;

    return (
        <section className="admin-products">
            <h2>Gestionar Productos</h2>
            <Link to="/admin" className="btn-add">+ Agregar</Link>
            
            <div className="admin-products-grid">
                {products.map((p) => (
                    <div key={p.id} className="admin-product-card">
                        {p.image && <img src={p.image} alt={p.name} />}
                        <h3>{p.name}</h3>
                        <p>${p.price}</p>
                        <div className="admin-product-actions">
                            <Link to={`/admin/edit/${p.id}`} className="btn-edit">
                                Editar
                            </Link>
                            <button onClick={() => handleDelete(p.id)} className="btn-delete">
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};