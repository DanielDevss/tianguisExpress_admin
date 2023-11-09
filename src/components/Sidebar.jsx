import {NavLink} from "react-router-dom"

import Logotipo from "../assets/images/logotipo.png";

const Sidebar = () => {
  return (
    <aside className="sidebar p-3 pe-0 bg-dark text-bg-dark">
        <header className='p-2'>
            <img src={Logotipo} className="w-75 d-block m-auto" />
        </header>
        <div className="nav-pill list-unstyled mt-5">
            
            <NavLink to="cuenta" className="nav-link my-2 p-2">

                <span className='ms-2'>Ajustes de cuenta</span>
            </NavLink>

            <NavLink to="tienda" className="nav-link my-2 p-2">

                <span className='ms-2'>Tienda y ventas</span>
            </NavLink>
            
            <NavLink to="suscritos" className="nav-link my-2 p-2">

                <span className='ms-2'>Correos y clientes</span>
            </NavLink>
            
            <NavLink to="contenido" className="nav-link my-2 p-2">

                <span className='ms-2'>Modificar contenido</span>
            </NavLink>
        
        </div>
    </aside>
  )
}

export default Sidebar
