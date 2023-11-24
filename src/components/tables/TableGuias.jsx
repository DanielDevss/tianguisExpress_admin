import DataTable from "react-data-table-component";
import useGuias from "../../hooks/useGuias"
import customStyles, {paginationOptions} from "../../utils/themeTables";
import { Modal } from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formatPriceMX } from "../../utils/utils";

const TableGuias = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { guias, agregar, eliminar } = useGuias();
    const [openModal, setOpenModal] = useState(false);
    const handleAbrir = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    const columns = [
        {
            name: "Nombre de guia",
            selector: (row) => row.guia,
        },
        {
            name: "Paqueteria",
            selector: (row) => row.paqueteria,
        },
        {
            name: "Peso Minimo",
            selector: (row) => `${row.peso_min} kg`,
        },
        {
            name: "Peso Máximo",
            selector: (row) => `${row.peso_max} kg`,
        },
        {
            name: "Monto",
            selector: (row) => row.monto,
            cell: (row) => formatPriceMX(row.monto),
        },
        {
            name: "Tiempo de entrega",
            selector: (row) => `${row.tiempo_entrega} días`,
        },
        {
            name: "Acción",
            cell: (row) => <button onClick={() => eliminar(row.id)} className="btn btn-outline-danger"><FaTrash className="mb-1" /></button>
        },
    ]

    const onSubmit = (data) => {
        agregar(data, handleClose); 
    } 

    return (
        <div>
        
            <div className="d-flex gap-1 justify-content-end">
                <button onClick={handleAbrir} className="btn btn-primary fw-bold">Agregar una guía</button>
            </div>
        
            <DataTable title={"Guias registradas"} customStyles={customStyles} paginationComponentOptions={paginationOptions} columns={columns} data={guias}></DataTable>
        
            <Modal onHide={handleClose} show={openModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Rellena el formulario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)} className="row">
                        <div className="col-md-6 mb-3">
                            <label className="fw-bold form-label">* Nombre de la Guía</label>
                            <input {...register("guia",{required:true})} type="text" className="form-control" placeholder="Ingresa un nombre a la guía" />
                            {errors.guia?.type==="required" && <span className="text-danger d-block mt-1">Este campo es obligatorio</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="fw-bold form-label">* Paquetería</label>
                            <input {...register("paqueteria", {required:true})} type="text" className="form-control" placeholder="Ingresa el nombre de la paquetería" />
                            {errors.paqueteria?.type==="required" && <span className="text-danger d-block mt-1">Este campo es obligatorio</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="fw-bold form-label">* Peso máximo (kg)</label>
                            <input {...register("peso_max", {required:true})} type="number" className="form-control" placeholder="Peso máximo de la guía" />
                            {errors.peso_max?.type==="required" && <span className="text-danger d-block mt-1">Este campo es obligatorio</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="fw-bold form-label">* Peso minimo (kg)</label>
                            <input {...register("peso_min", {required:true})} type="number" className="form-control" placeholder="Peso minimo de la guía" />
                            {errors.peso_min?.type==="required" && <span className="text-danger d-block mt-1">Este campo es obligatorio</span>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="fw-bold form-label">* Monto</label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input {...register("monto", {register:true})} type="number" className="form-control" placeholder="Que precio tiene esta guía" />
                                <span className="input-group-text">MX</span>
                            </div>
                            {errors.monto?.type==="required" && <span className="text-danger d-block mt-1">Este campo es obligatorio</span>}
                        </div>
                        <div className="col-md-6">
                            <label className="fw-bold form-label">* Tiempo de entrega</label>
                            <div className="input-group">
                                <input {...register("tiempo_entrega", {register:true})} type="number" className="form-control" placeholder="Tiempo de retardo" />
                                <span className="input-group-text">días</span>
                            </div>
                            {errors.tiempo_entrega?.type==="required" && <span className="text-danger d-block mt-1">Este campo es obligatorio</span>}
                        </div>
                        <div className="d-flex justify-content-end gap-1">
                            <button type="button" className="btn btn-outline-secondary fw-bold" onClick={handleClose}>Cerrar ventana</button>
                            <button type="submit" className="btn btn-primary fw-bold">Guardar Guía</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default TableGuias
