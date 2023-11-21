import {useForm} from "react-hook-form";
import { FaEnvelope, FaLock, FaTriangleExclamation, FaEnvelopeCircleCheck, FaPersonCircleCheck } from "react-icons/fa6";
import useSession from "../hooks/useSession";
import Isotipo from "../assets/icons/Isotipo.png"
import { expRegs } from "../utils/utils";
import { useState } from "react";
const Registro = () => {

    const { nuevoUsuario } = useSession()
    const { register, formState: {errors, touchedFields}, handleSubmit } = useForm();
    const [ pending, setPending ] = useState();

    const handleSubmitForm = (data) => {
        const {correo, clave, nombre} = data;
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("correo", `${correo}@tianguisexpress.com.mx`);
        formData.append("clave", clave)
        nuevoUsuario(formData, setPending);
    }

  return (

    <section style={{minHeight:"100vh"}} className="w-100 bg-body-secondary d-flex align-items-center justify-content-center">
        
        <section style={{width: "min(500px, 95%)"}} className={`bg-body my-3 p-4 border-bottom border-4`}>

            <img src={Isotipo} alt="Logotipo de Tianguis Express" width={60} className="mx-auto d-block my-3" />

            <form onSubmit={handleSubmit(handleSubmitForm)} noValidate>
                <legend className="title fw-bold text-center mb-4">Registrate</legend>
                <fieldset>

                    <div className="mb-3">
                        <label className="form-label">
                            {(touchedFields.nombre && !errors.nombre) && <FaPersonCircleCheck className="mb-1 text-success me-2" />}
                            Nombre completo
                        </label>
                        <input {...register('nombre', {required: true})} type="text" className="form-control" placeholder="Ingresa tu nombre completo" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            {(touchedFields.correo && !errors.correo) && <FaEnvelopeCircleCheck className="me-2 mb-1 text-success" />}
                            Correo eléctronico: 
                        </label>
                        <div className="input-group">
                            <input {...register('correo', {required: true, pattern: /^[a-zA-Z0-9_.-]+$/ })} type="email" className="form-control" placeholder="Ingresa el usuario" />
                            <span className="input-group-text">@tianguisexpress.com.mx</span>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label className="form-label">Contraseña:</label>
                        <input {...register('clave', {required: true, pattern: expRegs.password})} type="password" className="form-control" placeholder="Contraseña de acceso" />
                        <p style={{fontSize:"14px"}} className="text-muted mt-2 d-block">Para acceder al panel administrativo, tu contraseña debe cumplir con ciertos requisitos para garantizar la seguridad. <span className={errors.clave?.type==="pattern" && 'text-danger fw-bold'}>La contraseña debe tener al menos 8 caracteres. También, necesitas incluir al menos una letra mayúscula (una letra grande), un carácter especial como guion, guion medio o punto, y algunos números</span>. Esto ayuda a que tu contraseña sea lo suficientemente fuerte y difícil de adivinar.</p>
                    </div>

                    <div className="mb-3">
                        <button className={`btn btn-primary px-5 ${(pending && "disabled")}`}>{pending ? "Registrando..." : "Registrar"}</button>
                    </div>

                    {errors.nombre?.type === "required" && <span className="alert alert-danger d-block rounded-0 border-start border-4 border-danger border-0"><FaTriangleExclamation className="mb-1" /> El nombre es obligatorio</span>}
                    
                    {errors.correo?.type === "required" && <span className="alert alert-danger d-block rounded-0 border-start border-4 border-danger border-0"><FaEnvelope className="mb-1" /> El correo eléctronico es obligatorio</span>}

                    {errors.correo?.type === "pattern" && <span className="alert alert-danger d-block rounded-0 border-start border-4 border-danger border-0"><FaEnvelope className="mb-1" /> Para el correo solo agrega el usuario antes del @; no se aceptan caracteres especiales.</span>}
                    
                    {errors.clave?.type === "required" && <span className="alert alert-danger d-block rounded-0 border-start border-4 border-danger border-0"><FaLock className="mb-1" /> La contraseña es obligatoria</span>}
                    
                    {errors.clave?.type === "pattern" && <span className="alert alert-danger d-block rounded-0 border-start border-4 border-danger border-0"><FaLock className="mb-1" /> La contraseña que ingresaste no es segura</span>}

                </fieldset>
            </form>
        </section>

    </section>
  )
}

export default Registro
