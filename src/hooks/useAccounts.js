import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
const url = `${import.meta.env.VITE_URL}/controllers/controllers.accounts.php`;

const useAccounts = () => {

    const [accounts, setAccounts] = useState([]);

    const obtenerUsuarios = () => {
        axios.get(url).then(response => {
            if(response.status === 200) {
                setAccounts(response.data);
            }
        })
    }

    const cambiarRol = (rol, id) => {
        console.log(`ROL: ${rol} y ID: ${id}`)
        axios.post(`${url}?rolupdate&rol=${rol}&id=${id}`).then(response => {
            console.log(response);
            if(response.status == 200){
                obtenerUsuarios();
            }
        })
    }

    const eliminar = (id) => {
        Swal.fire({
            title: "¿Eliminar usuario?",
            text: "¿Estas seguro de eliminar este usuario?, si esta seguro de eliminar este usuario preciona eliminar.",
            icon: "question",
            confirmButtonText: "Eliminar(Si)",
            cancelButtonText: "Cancelar(No)",
            showCancelButton: true
        }).then(request => {
            if(request.isConfirmed){
                axios.post(`${url}?id=${id}&delete`).then(response => {
                    if(response.status == 200) {
                        Swal.fire({
                            timer: 2000,
                            icon: "success",
                            title: "Eliminado",
                            showConfirmButton: false,
                        });
                        obtenerUsuarios();
                    }
                })
            }else{
                Swal.fire({
                    timer: 2000,
                    title: "Cancelado",
                    icon: "error",
                    showConfirmButton: false
                })
            }
        })
    }

    useEffect(() => {
        obtenerUsuarios();
    }, [])

    return {
        accounts,
        eliminar,
        cambiarRol,
    }

}

export default useAccounts;