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
    const [estadoUpd, setEstadoUpd] = useState(false);
    const [pendingImage, setPendingImage] = useState(false);

    // LINK DETALLES

    const obtenerDetalles = async() => {
        const {data} = await axios.get(`${url}controllers/controllers.productos.php?id=${id}`);
        const {producto, variantes, imagenes} = await data;
        setProducto(producto);
        setVariantes(variantes);
        setImagenes(imagenes)
    }

    // LINK ACTUALIZAR PRODUCTO

    const actualizarProducto = ({body}) => {
        console.log("enviando...")
        setEstadoUpd(true);
        fetch(`${url}controllers/controllers.productos.php?update&id=${id}`, {
            method: "POST",
            body: body,
        })
        .then(respuesta => respuesta.json())
        .then((data) => {
            console.log(data);
            setTimeout(() => {
                setEstadoUpd(false)
                Swal.fire({
                    title: "Actualizado",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2500
                })
            }, 1500)
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    // LINK MODELOS

    const agregarModelo = (e, accion, idupdate) => {
        e.preventDefault()
        console.log("agregando")
        const formData = new FormData(e.target);
        axios.post(`${url}controllers/controllers.inventario.php?action=${accion}&id=${idupdate ? idupdate : id}`, formData)
        .then(response => {
            if(response.status === 200){
                if(accion==="update"){
                    Swal.fire({
                        title: "Atualizado",
                        text: "Variante actualizada correctamente",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
                obtenerDetalles();
            }
        }).catch(err => console.log(err));
    }

    const quitarModelo = (id) => {
        Swal.fire({
            title: "¿Eliminar variante/modelo?",
            text: "Si deseas eliminar el modelo da click en eliminar",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Eliminar (Si)",
            cancelButtonText: "Cancelar (No)"           
        }).then(respuesta => {
            if(respuesta.isConfirmed){
                axios.post(`${url}controllers/controllers.inventario.php?action=delete&id=${id}`).then(response => {
                    if(response.status == 200){
                        console.log(response);
                        obtenerDetalles();
                    }
                })
            }
        })
    }

    // LINK AGREGAR IMAGEN

    const agregarImagen = (e) => {
        e.preventDefault();
        setPendingImage(true);
        const formData = new FormData(e.target);
        fetch(`${url}controllers/controllers.images.php?id=${id}`, {
            method: "POST",
            body: formData
        })
        .then(response=>response.json())
        .then(data=> {
            console.log(data);
            e.target.reset()
            setPendingImage(false);
            obtenerDetalles();
        })
    }

    // LINK ELIMINAR IMAGEN

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

    // LINK USEEFFECT

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
        actualizarProducto,
        estadoUpd,
        imagenes,
        variantes,
        agregarImagen,
        eliminarImagen,
        pendingImage,

        agregarModelo,
        quitarModelo,
    }
}

export default useProducto