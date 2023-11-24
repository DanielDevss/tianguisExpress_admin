import DataTable from "react-data-table-component"
import useOperaciones from "../../hooks/useOperaciones"
import { formatDate } from "../../utils/utils";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6"
import customStyles, {paginationOptions} from "../../utils/themeTables";
import CustomHeader from "./CustomHeader";
import LoaderContent from "../LoaderContent";

const TableMovimientos = () => {

    const {operacionesMov, pending} = useOperaciones();

    const operacionesDownload = operacionesMov.map(item => {
        return {
            "ID operación": item.id,
            "Operación": item.operacion,
            "Nombre de Operador": item.operador,
            "Nombre del que autorizo": item.autorizo,
            "Estado": item.autorizo ? "Autorizado" : "Espera",
            "Fecha de Operación" : item.fecha
        }
    })

    const optionsDownload = {
        data: operacionesDownload,
        filename: `MovimientosInventario`,
        sheetname: "Operaciones"
    }

    const columns = [
        {
            name: "ID Operación",
            selector: (row) => row.id,
            maxWidth: "150px"
        },
        {
            name: "Operación",
            selector: (row) => row.operacion,
            cell: (row) => <span className={`text-uppercase fw-bold badge ${row.operacion === "entrada" && "text-bg-primary"} ${row.operacion === "salida" && "text-bg-danger"} ${row.operacion === "venta" && "text-bg-success"}`}>{row.operacion}</span>,
            sortable: true,
            maxWidth: "130px"
        },
        {
            name: "Operador",
            selector: (row) => row.operador,
            sortable: true,
            minWidth: "250px"
        },
        {
            name: "Fecha de operación",
            selector: (row) => row.fecha,
            cell: (row) => <p className="my-2">{formatDate({datetime: row.fecha}).date}<br/>{formatDate({datetime:row.fecha}).time}</p>,
            sortable: true,
            minWidth: "200px"
        },
        {
            name: "Estado",
            selector: (row) => row.autorizo,
            cell: (row) => (
                <>
                    {row.operacion !== "ventas" ? <span className={`badge fw-bold text-uppercaase ${row.autorizo ? "text-bg-success" : "text-bg-secondary"}`}>{row.autorizo ? `Autorizado` : `En Espera`}</span> : <span className="badge fw-bold text-uppercase text-bg-secondary">Procesado</span>}
                </>
            ),
            maxWidth: "120px"
        },
        {
            name: "Acciones",
            maxWidth: "150px",
            cell: (row) => (
                <div className="btn-group">
                    <Link to={`/inventario/${row.operacion}/${row.id}`} className="btn btn-outline-primary"><FaEye className="mb-1" /></Link>
                </div>
            )
        }
    ]
    
    return (
        <DataTable responsive progressPending={pending} progressComponent={<LoaderContent />} title={<CustomHeader downloadOptions={optionsDownload} title={"Movimientos en el inventario"} placeholder="Buscar Operacion" />} pagination paginationComponentOptions={paginationOptions} customStyles={customStyles} highlightOnHover fixedHeader data={operacionesMov} columns={columns} />
  )
}

export default TableMovimientos
