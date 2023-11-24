import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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

    // LINK ACTUALIZAR STOCK MINIMO
    const actualizarStockMinimo = (e, id) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        console.log(Object.fromEntries(formData))
        axios.post(`${url}controllers.inventario.php?id=${id}`, formData).then(response => {
            console.log(response.data)
            if(response.status == 200){
                Swal.fire({
                    title: "Actualizado",
                    text: "El stock minimo ha sido actualizado",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        })
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
        actualizarStockMinimo,
        crearEntrada,
        crearSalida,
        pending,
    }
}

export default useInventario;