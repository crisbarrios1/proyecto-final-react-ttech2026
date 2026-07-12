import "./Item.css"

export const Item = ({ name, description, price, image, children }) =>{
    return(
        <article className="card">
            <img src={image} alt={`Foto de ${name}`} />
            <h2>{name}</h2>
            <h3>{description}</h3>
            <p className="price-list">${price}</p>
            {children}
        </article>
    )
}