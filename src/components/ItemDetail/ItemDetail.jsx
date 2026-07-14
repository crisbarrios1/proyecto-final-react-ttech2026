import { Item } from "../Item/Item"
import { useCart } from "../../context/CartContext"

export const ItemDetail = ({ item }) =>{
    const {addItem} = useCart()

    const handleAddToCart = () => {
        addItem(item)
    }

    return( <Item {...item} >
        <button className="btn primary" onClick={handleAddToCart}>Agregar al carrito</button>
    </Item>
    )
}