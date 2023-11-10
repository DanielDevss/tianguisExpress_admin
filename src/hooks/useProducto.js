import axios from "axios";
import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
const url = import.meta.env.VITE_URL;

const useProducto = () => {
    
    const {id} = useParams()
    
    const [producto, setProducto] = useState({});
    const [imagenes, setImagenes] = useState([]);
    const [variantes, setVariantes] = useState([])

    const obtenerDetalles = async() => {
        const {data} = await axios.get(`${url}controllers/controllers.productos.php?id=${id}`);
        const {producto, variantes, imagenes} = await data;
        setProducto(producto);
        setVariantes(variantes);
        setImagenes(imagenes)
    }
    
    const agregarImagen = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        fetch(`${url}controllers/controllers.images.php?id=${id}`, {
            method: "POST",
            body: formData
        })
        .then(response=>response.json())
        .then(data=> {
            console.log(data);
            obtenerDetalles();
        })
    }

    const eliminarImagen = (id) => {
        Swal.fire({
            title: "¿Eliminar imagen?",
            text: "¿Estas seguro que deseas eliminar esta imagen?",
            icon: "question",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then(response => {
            if(response.isConfirmed){
                axios.post(`${url}controllers/controllers.images.php?id=${id}&delete`)
                .then(respuesta => {
                    console.log(respuesta);
                    obtenerDetalles();
                })
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get(`${url}controllers/controllers.productos.php?id=${id}`);
            const {producto, variantes, imagenes} = await data;
            setProducto(producto);
            setVariantes(variantes);
            setImagenes(imagenes)
        }
        fetchData();
    }, [id])

    return {
        producto,
        imagenes,
        variantes,
        agregarImagen,
        eliminarImagen,
    }
}

export default useProducto