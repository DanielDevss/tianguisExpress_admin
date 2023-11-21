import {useForm} from "react-hook-form";
import { FaEnvelope, FaLock, FaTriangleExclamation } from "react-icons/fa6";
import Isotipo from "../assets/icons/Isotipo.png"
import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const {login} = useContext(AuthContext);

    const { register, formState: {errors}, handleSubmit } = useForm();
    const [ pending, setPending ] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmitForm = (data) => {
        setPending(true)
        setError(null);
        const formData = new FormData();
        formData.append("correo", data.correo);
        formData.append("clave", data.clave);
        axios.post(`${import.meta.env.VITE_URL}controllers/controllers.auth.php`, formData)
        .then(response => {
            if(response.status==200){
                const token = response.data.token;
                setTimeout(() => {
                    login(token);
                    setPending(false);
                    navigate("/");
                }, 1500);
            }
        })
        .catch(err => {
            const {response} = err;
            if(response.status == 404){
                setError("Correo eléctronico no registrado")
            }
            else if(response.status == 401){
                setError("Contraseña incorrecta")
            }
            setPending(false);
        })
    }

    const expCorreo = /^[a-zA-Z0-9._%+-]+@tianguisexpress\.com\.mx$/;

  return (
    <section style={{height:"100vh"}} className="w-100 bg-body-secondary d-flex align-items-center justify-content-center">
        
        <section style={{width: "min(500px, 95%)"}} className={`bg-body p-4 border-bottom border-4 ${errors.correo || errors.clave || error  ? "border-danger" : "border-primary"}`}>

            <img src={Isotipo} alt="Logotipo de Tianguis Express" width={60} className="mx-auto d-block my-3" />

            <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
                <legend className="title fw-bold text-center mb-4">Inicio de sesión</legend>
                <fieldset>

                    <div className="mb-3">
                        <label className="form-label">Correo eléctronico:</label>
                        <input {...register('correo', {required: true, pattern: expCorreo
 })} type="email" className="form-control" placeholder="correo@example.com" />
                    </div>
                    
                    <div className="mb-4">
                        <label className="form-label">Contraseña:</label>
                        <input {...register('clave', {required: true})} type="password" className="form-control" placeholder="Contraseña de acceso" />
                    </div>

                    <div className="mb-3">
                        <button className={`btn btn-primary px-5 ${pending && "disabled"}`}>{pending ? "Verificando..." : "Iniciar sesión"}</button>
                    </div>

                    {errors.correo?.type === "required" && <span className="alert alert-danger d-block rounded-0 border-start border-4 border-danger border-0"><FaEnvelope className="mb-1" /> El correo eléctronico es obligatorio</span>}
                    {errors.correo?.type === "pattern" && <span className="alert alert-danger d-block rounded-0 border-start border-4 border-danger border-0"><FaEnvelope className="mb-1" /> El correo eléctronico parece ser invalido. Para el dashboard solo se admiten correos con dominio <b>@tianguisexpress.com.mx</b></span>}
                    {errors.clave?.type === "required" && <span className="alert alert-danger d-block rounded-0 border-start border-4 border-danger border-0"><FaLock className="mb-1" /> La contraseña es obligatoria</span>}

                    {error && <span className="alert alert-danger d-block rounded-0 border-start border-4 border-danger border-0"><FaTriangleExclamation className="mb-1" /> {error}</span>}

                </fieldset>
            </form>
        </section>

    </section>
  )
}

export default Login
