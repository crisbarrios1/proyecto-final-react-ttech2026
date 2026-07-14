import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

const productRef = collection(db,"products")

//Traer productos
export const getProducts = async () => {
   try {
    const snapshot = await getDocs(productRef)

    const productsFormat = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data()}
    })
    return productsFormat
   } catch (error) {
    console.log("Error al traer productos:", error)
    return []
    
   } 
}

//Traer por id
export const getProductById = async (id) => {
    try {
        // Creamos la referencia al documento
        const productRef = doc(db, "products", id);

        // Traemos el documento:
        const snapshot = await getDoc (productRef);

        // Verificamos si existe
        if (snapshot.exists()) {
            const product = { id: snapshot.id, ...snapshot.data() };
            return product;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al traer producto por ID:", error);
        return null;
    }
}


//Crear productos
export const createProduct = async (productData) => {
    try{
    //Tan facil como usar la funcion addDoc y pasarle la coleccion y el doc a agregar
        const docRef = await addDoc (productRef, productData);

        return docRef.id; // opcional, por si quieren usar el id para algo
    } catch (error) {
        console.error("Error al crear producto:", error);
        throw error;
    }
};
