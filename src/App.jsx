import {Routes, Route} from "react-router-dom"

import Login from "./pages/Login"
import Registro from "./pages/Registro"
import Layout from "./pages/Layout"
import Shop from "./pages/Shop"
import Account from "./pages/Account"
import Mailes from "./pages/Mailes"
import SettingsWeb from "./pages/SettingsWeb"
import Categorias from "./pages/Categorias"
// import InventarioIndex from "./pages/Inventario"
import ProductosIndex from "./pages/Productos"
import Usuarios from "./pages/Usuarios"
import Guias from "./pages/Guias"
import Clientes from "./pages/Clientes"
import Cliente from "./pages/clientes/Cliente"

import AddProduct from "./pages/shop/AddProduct"
import Productos from "./pages/shop/Productos"
import Producto from "./pages/shop/Producto"
import Inventario from "./pages/shop/Inventario"
import Cupones from "./pages/shop/Cupones"

import ShowMails from "./pages/mails/ShowMails"
import Operacion from "./pages/shop/Operacion"
import Ventas from "./pages/shop/Ventas"
import Venta from "./pages/shop/Venta"

import AuthContext from "./Context/AuthContext"
import useAuth from "./hooks/useAuth"


const App = () => {

  const {login, logout, token, correo, idUser, rol, nombre} = useAuth()

  return (

    <AuthContext.Provider value={{login, logout, token, correo, idUser, rol, nombre}}>
      <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registrar/:token" element={<Registro />}></Route>
          
          <Route path="/" element={<Layout/>}>
              {/* Principales */}
              <Route index element={<Shop />} />
              <Route path="ventas-menu" element={<Shop />} />
              <Route path="productos-menu" element={<ProductosIndex />} />
              {/* <Route path="inventario-menu" element={<InventarioIndex />} /> */}
              <Route path="cuenta" element={<Account />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="clientes" element={<Clientes />} />
              <Route path="clientes/:id" element={<Cliente />} />
              <Route path="suscritos" element={<Mailes />} />
              <Route path="contenido" element={<SettingsWeb />} />
              <Route path="guias" element={<Guias />} />
              {/* Elementos de tienda */}
              <Route path="nuevo-producto" element={<AddProduct />} />
              <Route path="categorias" element={<Categorias />} />
              <Route path="productos" element={<Productos />} />
              <Route path="productos/:id" element={<Producto />} />
              <Route path="inventario" element={<Inventario />} />
              <Route path="inventario/:operacion/:id" element={<Operacion />} />
              <Route path="ventas" element={<Ventas />} />
              <Route path="ventas/:id" element={<Venta />} />
              <Route path="cupones" element={<Cupones />} />
              {/* Elemntos de Mailes */}
              <Route path="/mostrar-suscritos/" element={<ShowMails />} />
          </Route>
      </Routes>
    </AuthContext.Provider>

  )
}

export default App
