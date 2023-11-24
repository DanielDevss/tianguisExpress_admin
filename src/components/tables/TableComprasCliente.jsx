import DataTable from "react-data-table-component"
import customStyles, {paginationOptions} from "../../utils/themeTables"
import { formatPriceMX } from "../../utils/utils"
import { Link } from "react-router-dom"

const TableComprasCliente = ({data}) => {
    console.log(data)

    const columns = [
        {
            name: "ID venta" ,
            selector : (row) => row.id,
        },
        {
            name: "Fecha de compra",
            selector: (row) => row.fecha_venta,
            sortable: true
        },
        {
            name: "Monto de compra",
            selector: (row) => row.monto_total,
            cell: (row) => formatPriceMX(row.monto_total),
            sortable: true
        },
        {
            name : "Ver compra",
            cell : (row) => <Link to={`/ventas/${row.id}`} className="btn btn-outline-secondary">Mostrar</Link>
        }
    ]

  return (
    <DataTable title={<h4>Compras realizadas por el cliente</h4>} data={data} columns={columns} customStyles={customStyles} paginationComponentOptions={paginationOptions} />
  )
}

export default TableComprasCliente