import "./ItemList.css"
import { Item } from "../Item/Item"
import { Link } from "react-router-dom"

export const ItemList = ({ products }) =>{
    if(!products.length){
        return <p>No hay productos</p>
    }

    return(
        <div className="products-container">
            {products.map((product) =>(
                <Link to={`/products/${product.id}`} key={product.id}>
                    <Item {...product}/>
                </Link>
            ))}
        </div>
    )
}