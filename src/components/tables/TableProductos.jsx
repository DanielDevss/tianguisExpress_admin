import DataTable from "react-data-table-component"
import useProductos from "../../hooks/useProductos"
import CustomHeader from "./CustomHeader";
import { formatPriceMX, formatDate } from "../../utils/utils";
import {FaTrash, FaArrowUpRightFromSquare, FaStar} from "react-icons/fa6"
import { Link } from "react-router-dom";

const url = import.meta.env.VITE_URL;

const TableProductos = () => {

    const {productos, eliminarProducto, actualizarEstado, destacarProducto} = useProductos();

    const handleEstado = (e, id) => {
        const input = e.target;
        const estado = input.checked ? "activo" : "inactivo";
        actualizarEstado({estado, id});
    }

    const handleDestacar = (value, id) => {
        const destacar = value == 0 ? 1 : 0;
        destacarProducto({destacar ,id});
    }
 
    const columns = [
        {
            name: "Imagen",
            cell: (row) => <img src={`${url}${row.cover}`} className="rounded-circle" width="50" />
        },
        {
            name: "SKU",
            selector: (row) => row.sku,
        },
        {
            name: "Producto",
            selector: (row) => row.titulo,
        },
        {
            name: "Precio",
            selector: (row) => formatPriceMX(row.precio),
        },
        {
            name: "Fecha creación",
            selector: (row) => formatDate({datetime: row.fecha}).date,
        },
        {
            name: "Publico",
            cell: (row) => {
                return(
                    <div className="form-check form-switch">
                        <input onInput={(e) => handleEstado(e, row.id)} type="checkbox" defaultChecked={row.estado === "activo" ? true : false} className="form-check-input" />
                    </div>
                )
            }
        },
        {
            name: "Acciones",
            cell: (row) => {
                const id = row.id
                return (
                    <div className="btn-group">
                        <button onClick={() => handleDestacar(row.destacar, id)} className={`btn btn-outline-primary ${row.destacar ==
                             1 && 'active'}`}><FaStar className="mb-1" />
                        </button>
                        
                        <button onClick={() => eliminarProducto(id)} className="btn btn-outline-primary"><FaTrash className="mb-1" /></button>
                        
                        <Link to={`${id}`} className="btn btn-outline-primary">
                            <FaArrowUpRightFromSquare className="mb-1" />
                        </Link>
                    </div>
                )
            }
        }
    ]

    return (
        <DataTable title={<CustomHeader title="Productos registrados" />} columns={columns} pagination data={productos} />
    )
}

export default TableProductos;