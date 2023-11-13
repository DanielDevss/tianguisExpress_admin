import {NavLink} from "react-router-dom"
import {MdManageAccounts, MdPointOfSale} from "react-icons/md";
import {BsFillEnvelopeAtFill} from "react-icons/bs";
import {FaPaintRoller} from "react-icons/fa6";

import Logotipo from "../assets/images/logotipo.png";

const Sidebar = () => {
  return (
    <aside className="sidebar p-3 pe-0 bg-dark text-bg-dark">
        <header className='p-2'>
            <img src={Logotipo} className="w-75 d-block m-auto" />
        </header>
        <div className="nav-pill list-unstyled mt-5">
            
            <NavLink to="cuenta" className="nav-link my-2 p-2">
                <MdManageAccounts className="fs-3" />
                <span className='ms-2'>Ajustes de cuenta</span>
            </NavLink>

            <NavLink to="tienda" className="nav-link my-2 p-2">
                <MdPointOfSale className="fs-3" />
                <span className='ms-2'>Tienda y ventas</span>
            </NavLink>
            
            <NavLink to="suscritos" className="nav-link my-2 p-2">
                <BsFillEnvelopeAtFill className="fs-3" />
                <span className='ms-2'>Correos y clientes</span>
            </NavLink>
            
            <NavLink to="contenido" className="nav-link my-2 p-2">
                <FaPaintRoller className="fs-3" />
                <span className='ms-2'>Modificar contenido</span>
            </NavLink>
        
        </div>
    </aside>
  )
}

export default Sidebar
