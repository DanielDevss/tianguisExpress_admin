import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const url = `${import.meta.env.VITE_URL}controllers/controllers.guias.php`;

const useGuias = () => {

    const [ guias, setGuias ] = useState([]);

    const obtenerGuias = () => {
        axios.get(url).then(response => {
            setGuias(response.data);
        })
    }

    const agregar = (data, closeModal) => {
        const formData = new FormData();
        formData.append("guia", data.guia);
        formData.append("paqueteria", data.paqueteria);
        formData.append("peso_max", data.peso_max);
        formData.append("peso_min", data.peso_min);
        formData.append("monto", data.monto);
        formData.append("tiempo_entrega", data.tiempo_entrega);

        axios.post(url, formData).then(response => {
            if(response.status == 200){
                obtenerGuias();      
                closeModal();
            }
        })
    }

    const eliminar = (id) => {
        Swal.fire({
            title: "¿Eliminar la guía?",
            text: "Si no estas seguro de eliminar da click en No",
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Cancelar (No)",
            confirmButtonText: "Eliminar (Si)",
            icon: "question"
        }).then(response => {
            const { isConfirmed } = response;
            if(isConfirmed){
                axios.post(`${url}?delete&id=${id}`).then((response) => {
                    if(response.status == 200){
                        obtenerGuias();
                    }
                })
            }
        })
    }

    useEffect(() => {
        axios.get(url).then(response => {
            setGuias(response.data);
        })
    }, [])

    return {
        guias,
        eliminar,
        agregar,
    }
}

export default useGuias;