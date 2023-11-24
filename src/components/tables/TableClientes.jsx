import DataTable from "react-data-table-component"
import customStyles, {paginationOptions} from "../../utils/themeTables"
import CustomHeader from "./CustomHeader";
import useClientes from "../../hooks/useClientes"
import { formatPriceMX } from "../../utils/utils";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const TableClientes = () => {
    const { clientes, clientesExcel } = useClientes();

    const columns = [
        {
            name: "Cliente",
            selector: (row) => row.nombre,
            sortable: true
        },
        {
            name: "Correo",
            selector: (row) => row.correo,
            sortable: true
        },
        {
            name: "Dirección",
            selector: (row) => row.direccion,
        },
        {
            name: "Compras",
            selector: (row) => row.total_compras,
            sortable: true,
            width: "120px"
        },
        {
            name: "Total vendido",
            selector: (row) => row.total_gastado,
            cell: (row) => <span className="fw-bold text-success">{formatPriceMX(row.total_gastado)}</span>,
            sortable: true,
            maxWidth: "200px"
        },
        {
            name: "Venta más alta",
            selector: (row) => row.total_gastado,
            cell: (row) => <Link className="text-nodecoration" to={`/ventas/${row.id_sale_max}`}>{formatPriceMX(row.monto_max_sale)}</Link>,
            sortable: true,
            maxWidth: "200px"
        },
        {
            name: "Acciones",
            cell: (row) => <Link className="btn btn-primary" to={`/clientes/${row.id}`}><FaEye /></Link>,
        },
    ]

    const optionsDownload = {
        data: clientesExcel,
        filename: "Catálogo de clientes",
        sheetname: "Catálogo de clientes"
    }
  return (
    <>
        <DataTable title={<CustomHeader placeholder="Buscar cliente" downloadOptions={optionsDownload} />} data={clientes} columns={columns} pagination customStyles={customStyles} paginationComponentOptions={paginationOptions} />
    </>
  )
}

export default TableClientes