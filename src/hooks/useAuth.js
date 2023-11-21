import { useEffect, useState } from "react";
import axios from "axios";
import { decodeToken } from "react-jwt";
const url = import.meta.env.VITE_URL + "controllers/controllers.auth.php";
const useAuth = () => {
  
    const [link, setLink] = useState();
    const [token, setToken] = useState(localStorage.getItem("tokenAuth") || null);
    const [nombre, setNombre] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [correo, setCorreo] = useState(null);
    const [rol, setRol] = useState(null);

    const login = (newtoken) => {
        setToken(newtoken);
        localStorage.setItem("tokenAuth", newtoken)
    }

    const logout = () => {
        setToken(null)
        localStorage.removeItem("tokenAuth");
    }

    const crearLink = () => {
        axios.post(`${url}?new_token`).then(response => {
            if(response.status == 200) {
                const { token } = response.data;
                setLink(`${import.meta.env.VITE_DOMAIN}/registrar/${token}`);
            }
        }) 
    }


    useEffect(() => {

        if(token) {
            const {id, correo, nombre, rol} = decodeToken(token);
            setCorreo(correo);
            setNombre(nombre);
            setRol(rol);
            setIdUser(id);
        }

    }, [token])

    return {
        link,
        crearLink,
        login,
        logout,
        token,
        nombre,
        correo,
        rol,
        idUser
    }
}

export default useAuth
