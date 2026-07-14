import './App.css'
import { Count } from "./components/Count/Count"
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'
import { CartView } from './components/Cart/CartView'
import { ProductSuccess } from './components/adminComponent/ProductSuccess'
import { ProductFormContainer } from './components/adminComponent/ProductFormContainer'
import { AdminProductList } from './components/adminComponent/AdminProductList';


function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/products/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<CartView />} />
          <Route path="/admin" element={<ProductFormContainer />}/>      
          <Route path="/success/:id" element={<ProductSuccess />}/>   
          <Route path="/admin/list" element={<AdminProductList />} />
          <Route path="/admin/edit/:id" element={<ProductFormContainer />} />
        </Routes>   
      </main>
      <Footer />
    </>
  )
}

export default App
