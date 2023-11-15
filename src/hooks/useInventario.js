import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const url = import.meta.env.VITE_URL + "controllers/";

const useInventario = () => {
    const navigate = useNavigate();

    const [inventario, setInventario] = useState([]);
    const [pending, setPending] = useState(true);

    // LINK OBTENER INVENTARIO
    const obtenerInventario = async() => {
        axios.get(`${url}controllers.inventario.php`).then(response => {
            setInventario(response.data);
            setTimeout(setPending(false), 1000)
        });
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
    const crearSalida = async () => {
        axios.post(`${url}controllers.operaciones.php?crear&operacion=salida`)
        .then(respuesta => {
            const {data} = respuesta;
            navigate(`/inventario/salida/${data.id_operacion}`);
        })
        .catch(err => {
            console.error(err);
        })
    }
    
    // LINK INICIALIZADORES
    useEffect(() => {
        obtenerInventario();
    }, []);

    return {
        inventario,
        crearEntrada,
        crearSalida,
        pending,
    }
}

export default useInventario;