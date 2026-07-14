import "./ProductFormUI.css"

export const ProductFormUI = ({
    product,
    errors,
    loading,
    onChange,
    onFileChange,
    onSubmit,
    isEditing,
    onDelete,
}) => {
    return (
        <section className="product-form-container">
            <h2>{isEditing ? "Editar producto" : "Agregar nuevo producto"}</h2>
            
            <form className="product-form" onSubmit={onSubmit}>
                <div className="product-form-group">
                    <label>Nombre: </label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={onChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="product-form-group">
                    <label>Precio: </label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={onChange}
                        min="0"
                        step="0.01"
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>
                
                <div className="product-form-group">
                    <label>Categoría: </label>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={onChange}
                    />
                    {errors.category && <p className="error">{errors.category}</p>}
                </div>
                
                <div className="product-form-group">
                    <label>Descripción: </label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={onChange}
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div className="product-form-group">
                    <label>Imagen:</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={onFileChange} 
                    />
                    {product.image && !file && (
                        <p style={{ color: '#888', fontSize: '14px', marginTop: '5px' }}>
                            Imagen actual: {product.image.substring(0, 30)}...
                        </p>
                    )}
                    {errors.file && <p className="error">{errors.file}</p>}
                </div>

                <button className="product-form-submit" type="submit" disabled={loading}>
                    {loading ? "Guardando..." : isEditing ? "Actualizar" : "Guardar"}
                </button>

                {isEditing && (
                    <button 
                        type="button"
                        className="product-form-delete"
                        onClick={onDelete}
                    >
                        🗑️ Eliminar producto
                    </button>
                )}

                {errors.general && <p className="product-form-error">{errors.general}</p>}
            </form>
        </section>
    );
};