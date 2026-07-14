import "./Item.css"

export const Item = ({ name, description, price, image, children }) =>{
    console.log("URL de la imagen:", image)
    return(
        <article className="card">
            {image && <img src={image} alt={name} />}
            <h2>{name}</h2>
            <h3>{description}</h3>
            {price > 0 && <p className="price-list">${price}</p>}
            {children}
        </article>
    )
}