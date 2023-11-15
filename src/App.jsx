import {Routes, Route} from "react-router-dom"

import Layout from "./pages/Layout"
import Shop from "./pages/Shop"
import Account from "./pages/Account"
import Mailes from "./pages/Mailes"
import SettingsWeb from "./pages/SettingsWeb"

import AddProduct from "./pages/shop/AddProduct"
import Productos from "./pages/shop/Productos"
import Producto from "./pages/shop/Producto"
import Inventario from "./pages/shop/Inventario"

import ShowMails from "./pages/mails/ShowMails"
import Operacion from "./pages/shop/Operacion"


const App = () => {

  return (

    <Routes>
        <Route path="/" element={<Layout/>}>
            {/* Principales */}
            <Route index element={<Shop />} />
            <Route path="tienda" element={<Shop />} />
            <Route path="cuenta" element={<Account />} />
            <Route path="suscritos" element={<Mailes />} />
            <Route path="contenido" element={<SettingsWeb />} />
            {/* Elementos de tienda */}
            <Route path="nuevo-producto" element={<AddProduct />} />
            <Route path="productos" element={<Productos />} />
            <Route path="productos/:id" element={<Producto />} />
            <Route path="inventario" element={<Inventario />} />
            <Route path="inventario/:operacion/:id" element={<Operacion />} />
            {/* Elemntos de Mailes */}
            <Route path="/mostrar-suscritos/" element={<ShowMails />} />

        </Route>
    </Routes>
  
  )
}

export default App
