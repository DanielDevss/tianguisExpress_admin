import axios from "axios";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const url = import.meta.env.VITE_URL;

const useProductos = () => {

    const [productos, setProductos] = useState([]);
    const [pending, setPending] = useState(true);
    const navigate = useNavigate();
    const obtenerProductos = () => {
        axios.get(`${url}controllers/controllers.productos.php`).then(response=>{
            if(response.status == 200){
                setTimeout(() => {
                    setPending(false)
                }, 1000)
                setProductos(response.data)
            }            
        });
    }

    useEffect(() => {
        obtenerProductos()
    }, [])

    // LINK CREAR PRODUCTO

    const crearProducto = async ({body}) => {

        console.log(body)

        const formData = new FormData();

        formData.append("sku", body.sku);
        formData.append("categoria", body.categoria);
        formData.append("subcategoria", body.subcategoria);
        formData.append("codigo", body.codigo);
        formData.append("cover", body.cover[0]);
        formData.append("detalles", body.detalles);
        formData.append("mas_informacion", body.mas_informacion);
        formData.append("nombre", body.nombre);
        formData.append("peso", body.peso);
        formData.append("precio", body.precio);
        formData.append("titulo", body.titulo);
        formData.append("emp_alto", body.emp_alto);
        formData.append("emp_ancho", body.emp_ancho);
        formData.append("emp_largo", body.emp_largo);
        formData.append("alto", body.alto);
        formData.append("ancho", body.ancho);
        formData.append("largo", body.largo);

        fetch(`${url}controllers/controllers.productos.php`, {
            method: "POST",
            body: formData,
        })
        .then(respuesta => respuesta.json())
        .then((data) => {
            navigate(`/productos/${data.id}`);
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    // LINK ELIMINAR PRODUCTO

    const eliminarProducto = (id) => {
        Swal.fire({
            title: "¿Seguro de realizar la acción?",
            text: "Este registro será eliminado permanentemente",
            showConfirmButton: true,
            showCancelButton: true,
        }).then(response => {
            if(response.isConfirmed){
                axios.post(`${url}controllers/controllers.productos.php?delete&id=${id}`)
                .then(resultado => {
                    obtenerProductos();
                    console.log(resultado);
                })
            }
        })
    }

    // LINK ESTADO
    
    const actualizarEstado = ({estado, id}) => {
        axios.post(`${url}controllers/controllers.productos.php?estado=${estado}&id=${id}`)
        .then(respuesta => {
            obtenerProductos();
            console.log(respuesta)
        })
    }
    
    // LINK TEMPORADA
    
    const actualizarTemporada = ({temporada, id}) => {
        axios.post(`${url}controllers/controllers.productos.php?temporada&activo=${temporada}&id=${id}`)
        .then(respuesta => {
            obtenerProductos();
            setTimeout(() => {
                Swal.fire({
                    toast: true,
                    text: (temporada == 1) ? "Producto agregado a temporada" : "Producto removido de temporada",
                    showConfirmButton: false,
                    backdrop: false,
                    timer: 1500,
                    position: "top",
                    padding: 0,
                    background: (temporada == 1) ? "#00933e" : "#fff401",
                    color: (temporada == 1) ? "#fff" : "#161616",
                })
            }, 500)
            console.log(respuesta);
        })
        .catch(err=>{
            console.log(err);
        })
    }
    
    // LINK DESTACAR

    const destacarProducto = ({destacar, id}) => {
        axios.post(`${url}controllers/controllers.productos.php?destacar=${destacar}&id=${id}`)
        .then(respuesta => {
            obtenerProductos();
            Swal.fire({
                toast: true,
                text: (destacar == 1) ? "Producto agregado a destacados" : "Producto removido de destacados",
                showConfirmButton: false,
                backdrop: false,
                timer: 1500,
                position: "top",
                padding: 0,
                background: (destacar == 1) ? "#00933e" : "#fff401",
                color: (destacar == 1) ? "#fff" : "#161616",
            })
            console.log(respuesta)
        })
    }

    // LINK DESCUENTO 

    const crearDescuento = (e, id, closeModal) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        if(data.descuento > 99) {
            Swal.fire({
                title: "Descuento invalido",
                text: "No puedes agregar descuentos mayores a 99%",
                icon: "warning",
                confirmButtonText: "Entendido",
            })
            
            return;
        }
        if(data.descuento < 1) {
            Swal.fire({
                title: "Descuento invalido",
                text: "No puedes agregar descuentos menores al 1%",
                icon: "warning",
                confirmButtonText: "Entendido",
            })

            return;
        }

        closeModal();

        console.table(data);

        axios.post(`${url}controllers/controllers.productos.php?descuento&id=${id}`, formData).then(response => {
            console.log(response)
            obtenerProductos()
            if(response.status == 200){
                Swal.fire({
                    title: "Listo",
                    text: "Le haz agregado un descuento a este producto",
                    icon: "success",
                    timer: 3000,
                    showConfirmButton: false
                });
            }
        })

    }


    const eliminarDescuento = (id, cb) => {
        axios.post(`${url}controllers/controllers.productos.php?descuento&id=${id}`).then(response => {
            if(response.status == 200){
                Swal.fire({
                    title: "Descuento eliminado",
                    text: "Haz removido el descuento de este producto",
                    showConfirmButton: false,
                    icon: "success",
                    timer: 2000
                });
            }else{
                Swal.fire({
                    title: "Error",
                    text: "Ocurrio un error al eliminar el descuento",
                    showConfirmButton: false,
                    icon: "error",
                    timer: 2000
                });
            }
            cb();
            obtenerProductos()
        }).catch(err => {
            console.log(err);
            Swal.fire({
                title: "Error",
                text: "Ocurrio un error al eliminar el descuento",
                showConfirmButton: false,
                icon: "error",
                timer: 2000
            });
            cb();
        })
    }

    return {
        productos,
        pending,
        crearProducto,
        eliminarProducto,
        actualizarEstado,
        actualizarTemporada,
        destacarProducto,
        crearDescuento,
        eliminarDescuento,
    }
}

export default useProductos