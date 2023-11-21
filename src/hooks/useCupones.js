import axios from "axios";
import {useState, useEffect} from "react";
import Swal from "sweetalert2";
const url = `${import.meta.env.VITE_URL}controllers/controllers.cupones.php`;

const useCupones = () => {

    const [cupones, setCupones] = useState([]);

    const agregar = (data) => {
        const formData = new FormData();
        formData.append("cupon", data.cupon);
        formData.append("tipo_descuento", data.tipo);
        formData.append("descuento", data.descuento);
        formData.append("descripcion", data.descripcion);
        formData.append("cant_usos", data.cant);
        formData.append("precio_min", data.precio_min);
        axios.post(url, formData).then(response => {
            if(response.status == 200){
                Swal.fire({
                    title: "Cupon agregado",
                    text: "El cupon se agrego correctamente",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                })
            }
        })
    }

    const eliminar = () => {

    }

    useEffect(() => {
        axios.get(url).then(response => {
            if(response.status == 200){
                setCupones(response.data);
            }
        })
    }, [])

    return {
        cupones,
        agregar,
        eliminar,
    }
}

export default useCupones
