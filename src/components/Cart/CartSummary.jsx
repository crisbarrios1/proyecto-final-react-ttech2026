import { useCart } from "../../context/CartContext"

export const CartSummary = () => {
    const { getCartTotal, checkout } = useCart()

    const total = getCartTotal() 
    
    return( 
        <>
            <p>TOTAL A PAGAR: 👉 ${total}</p>  {/* ✅ Mostrar el valor de total */}
            <button className="btn bg-success primary" onClick={checkout}>
                FINALIZAR COMPRA
            </button>
        </>
    )
}