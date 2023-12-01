import useOperaciones from "../../hooks/useOperaciones"
import { useForm } from "react-hook-form"
import { useRef } from "react"
import { FaPenToSquare, FaPlus, FaXmark } from "react-icons/fa6"

const Operacion = () => {

    const { productosMovimiento, operacion } = useOperaciones()
    const { register, handleSubmit, formState: {errors} } = useForm();

    const handleOnSubmit = (data) => {
        console.table(data);
    }

    const formProveedor = useRef();
    const handleExternalSubmit = () => {
        formProveedor.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    };

  return (
    <>
        <header className="d-flex align-items-center justify-content-between">
            <h1>Operación de {operacion.operacion}</h1>
            <button onClick={handleExternalSubmit} className="btn btn-primary fw-bold">Guardar información</button>
        </header>

        <form ref={formProveedor} onSubmit={handleSubmit(handleOnSubmit)}>
            <fieldset className="row">
                <legend>Información del proveedor</legend>
                
                <div className="col-6 mb-3" >
                    <div className="form-floating">
                        <input {...register("proveedor", {required: true})} type="text" id="proveedorName" placeholder="Nombre del proveedor" className="form-control" />
                        <label htmlFor="proveedorName">Nombre del Proveedor</label>
                        {errors.proveedor?.type === "required" && <span className="text-danger">Este campo es obligatorio</span>}
                    </div>
                </div>
                
                <div className="col-6 mb-3" >
                    <div className="form-floating">
                        <input {...register("empresa", {required: true})} type="text" id="proveedorName" placeholder="Nombre de la empresa" className="form-control" />
                        <label htmlFor="proveedorName">Empresa Proveedora</label>
                        {errors.proveedor?.type === "required" && <span className="text-danger">Este campo es obligatorio</span>}
                    </div>
                </div>

                <div className="col-6 mb-3" >
                    <div className="form-floating">
                        <input {...register("documento", {required: true})} type="text" id="proveedorName" placeholder="Tipo de documento" className="form-control" />
                        <label htmlFor="proveedorName">Tipo de Documento</label>
                        {errors.documento?.type === "required" && <span className="text-danger">Este campo es obligatorio</span>}
                    </div>
                </div>

                <div className="col-6 mb-3" >
                    <div className="form-floating">
                        <input {...register("no_documento", {required: true})} type="text" id="proveedorName" placeholder="Tipo de documento" className="form-control" />
                        <label htmlFor="proveedorName">Número de Documento</label>
                        {errors.no_documento?.type === "required" && <span className="text-danger">Este campo es obligatorio</span>}
                    </div>
                </div>
            
            </fieldset>
        </form>

        <hr/>

        <header className="d-flex mt-4 mb-3 align-items-center justify-content-between">
            <h2 className="h4">Productos en movimiento</h2>
            <button className="fw-bold btn btn-primary">Agregar producto <FaPlus className="mb-1 fs-5" /></button>
        </header>
        <table className="table table-hover align-middle">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Variante</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {productosMovimiento && productosMovimiento.map (producto => (
                <tr key={producto.id}>
                    <td>Nombre del producto</td>
                    <td>{producto.variante}</td>
                    <td>{producto.cantidad}</td>
                    <td>
                        <div className="d-flex gap-1">
                            <button className="btn btn-primary btn-sm"><FaPenToSquare className="mb-1" /></button>
                            <button className="btn btn-danger btn-sm"><FaXmark className="mb-1" /></button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default Operacion