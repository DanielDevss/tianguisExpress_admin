import DataTable from "react-data-table-component";
import useCupones from "../../hooks/useCupones";
import { Modal } from "react-bootstrap";
import customStyles, { paginationOptions } from "../../utils/themeTables";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { useForm } from "react-hook-form";

const TablaCupones = () => {
    const { cupones } = useCupones()
    const [openModal, setOpenModal] = useState(false);

    const handleClose = () => setOpenModal(false);
    const handleOpen = () => setOpenModal(true);

    const columns = [
        {
            name: "Cupon",
            selector: (row) => row.cupon
        },
        {
            name: "Monto minimo",
            selector: (row) => row.precio_min
        },
        {
            name: "Descuento",
            selector: (row) => row.descuento
        },
        {
            name: "Cantidad de usos",
            selector: (row) => row.cant_usos
        },
        {
            name: "Estado",
            selector: (row) => row.estado
        },
        {
            name: "Fecha creación",
            selector: (row) => row.fecha_creacion
        },
        {
            name: "Acción",
            cell: (row) => <div className="btn-group">
                <button className="btn btn-outline-danger"><FaTrash/></button>
            </div>
        },
    ]

    const { register, formState: { errors }, handleSubmit } = useForm();

    const handleSubmitForm = (data) => {
        console.table(data);
    }

  return (
    <div>
      <DataTable title={<div className="d-flex justify-content-between"><h5>Registros de cupones</h5><button className="btn btn-primary fw-bold" onClick={handleOpen}>Agregar cupón</button></div>} data={cupones} columns={columns} customStyles={customStyles} paginationComponentOptions={paginationOptions}></DataTable>

      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Nuevo cupón</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form onSubmit={handleSubmit(handleSubmitForm)} className="row">
                <div className="col-md-6 mb-3">
                    <label className="fw-bold form-label">Cupón *</label>
                    <input {...register("cupon", {required: true})} type="text" className="form-control" placeholder="Ingresa un cupón de descuento" />
                    {errors.cupon?.type==="required" && <span className="d-block text-danger">Este campo es obligatorio</span>}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="fw-bold form-label">Monto minimo *</label>
                    <input {...register("monto_min", {required:true})} type="number" className="form-control" placeholder="Monto minimo de uso" />
                    {errors.monto_min?.type==="required" && <span className="d-block text-danger">Este campo es obligatorio</span>}
                </div>
                <div className="col-md-12 mb-3">
                    <label className="fw-bold form-label">Tipo de descuento</label>
                    <select className="form-select">
                        <option value="Porcentaje">Descuento por Porcentaje</option>
                        <option value="Monto">Descuento por Monto</option>
                    </select>
                </div>
                <div className="col-md-6 mb-3">
                    <label className="fw-bold form-label">Descuento *</label>
                    <input {...register("descuento", {required:true})} type="number" className="form-control" placeholder="Monto minimo de uso" />
                    {errors.descuento?.type==="required" && <span className="d-block text-danger">Este campo es obligatorio</span>}
                </div>
                <div className="col-md-6 mb-3">
                    <label className="fw-bold form-label">Cantidad de usos *</label>
                    <input {...register("cant_usos", {required:true, min: 1})} type="number" className="form-control" defaultValue={1} placeholder="Ingresa el descuento" />
                    {errors.cant_usos?.type==="required" && <span className="d-block text-danger">Este campo es obligatorio</span>}
                    {errors.cant_usos?.type==="min" && <span className="d-block text-danger">El minimo es 1</span>}
                </div>
                <div className="col-md-12 mb-3">
                    <label className="fw-bold form-label">Descripción</label>
                    <textarea placeholder="Ingresa una breve descripción" className="form-control"></textarea>
                </div>

                <div className="mt-2">
                    <button className="fw-bold btn btn-primary">Guardar cupón</button>
                </div>
            </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default TablaCupones
