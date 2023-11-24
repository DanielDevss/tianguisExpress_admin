import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const url = `${import.meta.env.VITE_URL}controllers/controllers.clientes.php`;

const useClientes = () => {
    const {id} = useParams();
    const [clientes, setClientes] = useState([]);
    const [clientesExcel, setClientesExcel] = useState([]);
    const [cliente, setCliente] = useState({});
    const [ventaMaxima, setVentaMaxima] = useState({});
    const [compras, setCompras] = useState([]);

    const obtenerClientes = () => {
        axios.get(url).then(response => {
            const {data} = response;
            const registros = data.map((item) => ({
                ...item , 
                direccion : `${item.calle} ${item.no_ext}-${item.no_int ? item.no_int : "sn"}, Col. ${item.colonia}, C.P. ${item.cp}, ${item.ciudad}, ${item.estado}, México`}
            ));
            setClientes(registros);
            const formatExcel = response.data.map(item => {
                return {
                    "ID cliente" : item.id,
                    "Nombre del cliente" : item.nombre,
                    "Correo eléctronico" : item.correo,
                    "Teléfono" : item.telefono,
                    "Dirección" : `${item.calle} ${item.no_ext}-${item.no_int ? item.no_int : "sn"}, Col. ${item.colonia}, C.P. ${item.cp}, ${item.ciudad}, ${item.estado}, México`,
                    "Compras realizadas" : item.total_compras,
                    "Total vendido" : item.total_gastado,
                    "Máximo vendido" : item.monto_max_sale,
                    "ID venta máxima" : item.id_sale_max                    
                }
            });
            setClientesExcel(formatExcel);
        })
    }

    const obtenerCliente = () => {
        axios.get(`${url}?id=${id}`).then(response => {
            if(response.status == 200){
                const { data: {cliente, compras, venta_maxima} } = response;
                setCliente(cliente); 
                setVentaMaxima(venta_maxima);
                setCompras(compras)
            }
        })
    }

    useEffect(() => {
        obtenerCliente();
    }, [id])

    useEffect(() => {
        obtenerClientes()
    }, [])

    return {
        clientes, 
        clientesExcel,
        cliente,
        
        compras,
        ventaMaxima,
    }
}

export default useClientes;