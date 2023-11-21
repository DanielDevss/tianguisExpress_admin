import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const url = import.meta.env.VITE_URL + "controllers/controllers.auth.php";

const useSession = () => {
    const [deviceCurrent, setDeviceCurrent] = useState('');
    const [systemOperative, setSystemOperative] = useState('');
    
    const navigate = useNavigate();
    const nuevoUsuario = (formatDate, setPending) => {
        setPending(true);
        axios.post(`${url}?register`, formatDate).then(response => {
            if(response.status == 200) {
                setTimeout(() => {
                    setPending(false)
                    Swal.fire({
                        title: "Registrado",
                        text: "Tu correo ha sido registrado correctamente. Inicia sesión ahora.",
                        icon: "success",
                        showConfirmButton: true,
                        confirmButtonText: "Aceptar"
                    }).then(response => {
                        if(response.isConfirmed){
                            navigate("/login");
                        }
                    })
                }, 1400);
            }
        })
        .catch(err => {
            console.log(err);
            Swal.fire({
                title: "Ha ocurrido un error",
                text: "Intentalo de nuevo, o intentalo con otro correo",
                timer: 3000,
                showConfirmButton: false,
                icon: "error"
            })
        });
    }

    useEffect(() => {
        let sistemaOperativo = navigator.userAgentData?.platform;
        sistemaOperativo = sistemaOperativo ? sistemaOperativo : navigator.platform;
        const dispositivo = /Mobile|Tablet|iPad|iPhone|Android/.test(navigator.userAgent) ? "Mobile Device" : "Desktop";
        setSystemOperative(sistemaOperativo);
        setDeviceCurrent(dispositivo);
        console.log(deviceCurrent)
    }, []);

    return {
        systemOperative,
        deviceCurrent,
        nuevoUsuario,
    }
}

export default useSession;