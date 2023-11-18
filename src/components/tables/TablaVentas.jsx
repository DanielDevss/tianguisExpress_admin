import DataTable from "react-data-table-component"
import CustomHeader from "./CustomHeader"
import LoaderContent from "../LoaderContent.jsx"
import { useState } from "react"
import customStyles, {paginationOptions} from "../../utils/themeTables.js"
import useVentas from "../../hooks/useVentas.js"
import { Link } from "react-router-dom"

import { FaArrowUpRightFromSquare, FaStripeS } from "react-icons/fa6";
import { formatPriceMX } from "../../utils/utils.js"


const TablaVentas = () => {
    const {ventas, pending} = useVentas()
    const [filterTable, setFilterTable] = useState('');
    
    const ventaDownload = ventas.map(item => {
        return {
            "ID" : item.id,
            "Payment Intent ID" : item.payment_intent_id,
            "Monto vendido" : formatPriceMX(item.monto_total),
            "Variedad de compra" : item.variedad_productos > 1 ? `${item.variedad_productos} distintos` : `Solo uno`,
            "Cantidad de compra" : `${item.cantidad_total_productos + (item.cantidad_total_productos > 1 ? " productos" : " producto")}`,
            "Cupon" : item.cupon_activo ? item.cupon_descuento : "Sin cupon",
            "Nombre del cliente" : item.nombre,
            "Correo del cliente" : item.correo,
            "Télefono del cliente" : item.telefono,
            "Estado de compra" : item.payment_intent_id ? "Procesado" : "Inconcluso",
            "Fecha de compra" : item.fecha_venta.split(" ")[0],
            "Hora de compra" : item.fecha_venta.split(" ")[1],
        }
    })
    const optionsDownload = {
        data: ventaDownload,
        filename: "Reporte de ventas",
        sheetname: "Reporte venta"
    }

    const columns = [
        {
            name: "ID de venta",
            selector: (row) => row.id
        },
        {
            name: "Payment Intent",
            selector: (row) => row.payment_intent_id
        },
        {
            name: "Monto vendido",
            sortable: true,
            selector: (row) => row.monto_total,
            cell: (row) => <span>{formatPriceMX(row.monto_total)} MX</span>
        },
        {
            name: "Cantidad",
            sortable: true,
            selector: (row) => row.cantidad_total_productos,
            cell: (row) => <span>{row.cantidad_total_productos + (row.cantidad_total_productos > 1 ? " productos" : " producto")}</span>
        },
        {
            name: "Cupon",
            selector: (row) => row.cupon_activo == 0 ? "No" : "Si"
        },
        {
            name: "Correo del cliente",
            sortable: true,
            selector: (row) => row.correo,
            cell: (row) => <Link className="nav-link link-primary text-truncate">{row.correo}</Link>
        },
        {
            name: "Fecha de venta",
            sortable: true,
            selector: (row) => row.fecha_venta
        },
        {
            name: "Estado",
            cell: (row) => <span className={`badge ${row.payment_intent_id ? "text-bg-success" : "text-bg-warning"}`}>{row.payment_intent_id ? 'Procesado' : 'Inconcluso'}</span> 
        },
        {
            name: "Acción",
            cell: (row) => (
                <div className="btn-group">
                    <Link className="btn btn-outline-primary" to={"/ventas/" + row.id}><FaArrowUpRightFromSquare className="mb-1" /></Link>
                    <Link className="btn btn-outline-primary" to={"/"}><FaStripeS className="mb-1" /></Link>
                </div>
            )
        },
    ]


    const filteredVentas = ventas.filter(
        (venta) =>{

            const correo = venta.correo ? venta.correo.toLowerCase() : '';
            const paymentIntentId = venta.payment_intent_id ? venta.payment_intent_id.toLowerCase() : '';
            const estado = venta.payment_intent_id ? "procesado" : 'inconcluso';
            const idVenta = venta.id ? venta.id.toLowerCase() : '';
            const fecha = venta.fecha_venta ? venta.fecha_venta.toLowerCase() : '';
            const monto = venta.monto_total ? `${venta.monto_total}` : '';
            
            return correo.includes(filterTable) || paymentIntentId.includes(filterTable) || idVenta.includes(filterTable) || fecha.includes(filterTable) || monto.includes(filterTable) || estado.includes(filterTable);
        }
    );

    const handleSearch = (e) => {
        setFilterTable(e.target.value.toLowerCase());
    }

  return (
    <DataTable progressPending={pending} progressComponent={<LoaderContent />} highlightOnHover customStyles={customStyles} paginationComponentOptions={paginationOptions} title={<CustomHeader downloadOptions={optionsDownload} searchOnChange={handleSearch} placeholder="Buscar" title="Reporte de ventas" />} btnAdd={false} columns={columns} pagination data={filteredVentas} responsive />
  )
}

export default TablaVentas