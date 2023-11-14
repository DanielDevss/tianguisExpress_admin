import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const url = import.meta.env.VITE_URL + "controllers/";

const useInventario = () => {
    const navigate = useNavigate();

    const [inventario, setInventario] = useState([]);

    // LINK OBTENER INVENTARIO
    const obtenerInventario = async() => {
        const {data} = await axios.get(`${url}controllers.inventario.php`);
        setInventario(data);
    }

    // LINK CREAR ENTRADA  
    const crearEntrada = async () => {
        axios.post(`${url}controllers.operaciones.php?crear&operacion=entrada`)
        .then(respuesta => {
            const {data} = respuesta;
            navigate(`/inventario/entrada/${data.id_operacion}`);
        })
        .catch(err => {
            console.error(err);
        })
    }

    // LINK CREAR SALIDA

    
    // LINK INICIALIZADORES
    useEffect(() => {
        obtenerInventario();
    }, []);

    return {
        inventario,
        crearEntrada,
    }
}

export default useInventario;