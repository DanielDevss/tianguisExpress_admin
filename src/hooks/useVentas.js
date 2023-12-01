import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const url = `${import.meta.env.VITE_URL}controllers/controllers.ventas.php`;
const useVentas = () => {
    
    const [ventas, setVentas] = useState([]);
    const [productosVendidos, setProductosVendidos] = useState([]);
    const [venta, setVenta] = useState({});
    const [pending, setPending] = useState(true);

    const {id} = useParams()

    useEffect(() => {
        axios.get(`${url}`).then(response => {
            if(response.status){
                setPending(false);
                setVentas(response.data);
            }
        });
    }, [])

    useEffect(() => {
        if(id) {
            axios.get(`${url}?id=${id}&full`).then(response => {
                const {data} = response;
                setVenta(data.detalles);
                setProductosVendidos(data.productos);
            })
        }
    }, [id])

    return {
        ventas,
        pending,
        venta,
        productosVendidos,
    }
}

export default useVentas;