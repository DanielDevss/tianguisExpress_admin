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

    // LINK DESTACAR

    const destacarProducto = ({destacar, id}) => {
        axios.post(`${url}controllers/controllers.productos.php?destacar=${destacar}&id=${id}`)
        .then(respuesta => {
            obtenerProductos();
            console.log(respuesta)
        })
    }

    // LINK DESCUENTO 

    const crearDescuento = (e, id) => {
        e.preventDefault();
        console.log(id)
        const formData = new FormData(e.target);
        console.log(Object.fromEntries(formData))
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

    return {
        productos,
        pending,
        crearProducto,
        eliminarProducto,
        actualizarEstado,
        destacarProducto,
        crearDescuento,
    }
}

export default useProductos