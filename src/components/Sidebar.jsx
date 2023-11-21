import {NavLink} from "react-router-dom"
import {MdManageAccounts, MdPointOfSale} from "react-icons/md";
import {FaPaintRoller, FaUsersGear, FaTruckRampBox} from "react-icons/fa6";
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";

import Logotipo from "../assets/images/logotipo.png";
import { FaDoorOpen } from "react-icons/fa";
import Swal from "sweetalert2";

const Sidebar = () => {

    const {logout, rol} = useContext(AuthContext)
    const handleLogout = () => {
        Swal.fire({
            title: "¿Salir del Dashboard?",
            text: "Al cerrar sesión saldras del Dasboard y tendras que volver a Login",
            icon: "question",
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonText: "Cancelar (No)",
            confirmButtonText: "Salir a login (SI)"
        }).then(response => {
            const {isConfirmed} = response;
            if(isConfirmed){
                logout();
            }
        })
    }

  return (
    <aside className="sidebar p-3 pe-0 bg-dark text-bg-dark d-flex flex-column justify-content-between">
        <header className='p-2'>
            <img src={Logotipo} className="w-75 d-block m-auto" />
        </header>
        <div className="nav-pill list-unstyled mt-5">
            
            <NavLink to="cuenta" className="nav-link my-2 p-2">
                <MdManageAccounts className="fs-3" />
                <span className='ms-2'>Ajustes de cuenta</span>
            </NavLink>

            {rol==="superadmin" && (
                <NavLink to="usuarios" className="nav-link my-2 p-2">
                    <FaUsersGear className="fs-3" />
                    <span className='ms-2'>Usuarios</span>
                </NavLink>
            )}

            <NavLink to="tienda" className="nav-link my-2 p-2">
                <MdPointOfSale className="fs-3" />
                <span className='ms-2'>Tienda y ventas</span>
            </NavLink>

            <NavLink to="guias" className="nav-link my-2 p-2">
                <FaTruckRampBox className="fs-3" />
                <span className='ms-2'>Guías de envío</span>
            </NavLink>
            
            <NavLink to="contenido" className="nav-link my-2 p-2">
                <FaPaintRoller className="fs-3" />
                <span className='ms-2'>Modificar contenido</span>
            </NavLink>
        
        </div>

        <div className="nav-pill mt-auto p-2">
            <button onClick={handleLogout} className="nav-link">
                <FaDoorOpen className="fs-3 mb-1 me-2" />
                <span>Cerrar sesión</span>
            </button>
        </div>
    </aside>
  )
}

export default Sidebar
