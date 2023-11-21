import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../Context/AuthContext";
const url = import.meta.env.VITE_URL + 'controllers/';
const useOperaciones = () => {

    const { nombre } = useContext(AuthContext);
    const {id} = useParams();
    const [productosMovimiento, setProductosMovimiento] = useState([]);  
    const [operaciones, setOperaciones] = useState([]);
    const [operacion, setOperacion] = useState({});
    const [pending, setPending] = useState(true);
    const [loadSaveOP, setLoadSaveOP] = useState(false);
    const navigate = useNavigate();


    // SECTION OPERACION

    const obtenerProductos = () => {
        axios.get(`${url}controllers.operaciones.php?productos_movimiento&id=${id}`)
        .then(respuesta => {
            const {data} = respuesta;
            setProductosMovimiento(data);  
        })
        .catch(err => {
            console.error(err)
        })
    }

    // LINK OBTENER OPERACIONES

    const obtenerOperacion = () => {
        axios.get(`${url}controllers.operaciones.php?operacion&id=${id}`)
        .then(resultado => {
            setOperacion(resultado.data);
        })
        .catch(err => console.error(err)); 
    }

    // LINK OBTENER OPERACIONES

    const obtenerOperaciones = () => {
        axios.get(`${url}controllers.operaciones.php`)
        .then(resultado => {
          const {data} = resultado;
          setOperaciones(data);  
        })
    }

    // LINK AUTORIZAR OPERACION

    const autorizarOperacion = async() => {
        Swal.fire({
            title: "¿Seguro deseas autorizar?",
            text: "Una vez autorizada la operación no se podran hacer cambios.",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Autorizar (Si)",
            cancelButtonText: "Cancelar (No)",
            icon: "question"
        }).then(respuesta => {

            if(respuesta.isConfirmed){

                const formData = new FormData();
                formData.append("nombre", nombre);
                formData.append("operacion", operacion.operacion);
                axios.post(`${url}controllers.operaciones.php?autorizar&id=${id}`, formData).then(respuesta => console.log(respuesta));
                
                Swal.fire({
                    title: "Autorizado",
                    timer: 1500,
                    icon: "success",
                    showConfirmButton: false
                })

                obtenerOperacion();
                navigate("/inventario");

            }else{
                Swal.fire({
                    title: "Cancelado",
                    timer: 1500,
                    icon: "error",
                    showConfirmButton: false
                });   
            }
        })
    }

    // LINK ACTUALIZAR OPERACION

    const actualizarOperacion = (data) =>{
        setLoadSaveOP(true);
        const formData = new FormData();
        formData.append("operador", data.operador);
        formData.append("proveedor", data.proveedor);
        formData.append("empresa", data.empresa);
        formData.append("no_documento", data.no_documento);
        formData.append("documento", data.documento);

        axios.post(`${url}controllers.operaciones.php?completar&id=${id}`, formData)
        .then(response => {
            if(response.status == 200){
                obtenerOperacion();

                setTimeout(() => {
                    setLoadSaveOP(false);
                    navigate("/inventario")
                }, 1000);
            }
        })
        .catch(err => {console.error(err); setLoadSaveOP(false)});
    }

    // !SECTION
    // SECTION PRODUCTOS DE OPERACION

    const agregarProducto = ({id_inventario}) =>{ 
        axios.post(`${url}controllers.operaciones.php?id=${id}&id_inventario=${id_inventario}&agregar`)
        .then(respuesta => {
            console.log(respuesta)
            obtenerProductos()
        })
    }


    const quitarProducto = ({id}) =>{ 
        axios.post(`${url}controllers.operaciones.php?id=${id}&quitar`)
        .then(respuesta => {
            console.log(respuesta)
            obtenerProductos()
        }).catch(error => {
            console.error(error)
        })
    }
    
    const actualizarProducto = ( e , {id}) => {
        console.log("actualizando...")
        const cantidad = e.target.value;
        axios.post(`${url}controllers.operaciones.php?id=${id}&actualizar&cantidad=${cantidad}`)
        .then(respuesta => {
            if(respuesta.status == 200){
                obtenerProductos()
            }
        }).catch(err => {
            console.error(err);
        })
    }

    // !SECTION

    useEffect(() => {
        
        axios.get(`${url}controllers.operaciones.php?productos_movimiento&id=${id}`)
        .then(respuesta => setProductosMovimiento(respuesta.data)).catch(err => console.error(err));

        axios.get(`${url}controllers.operaciones.php?operacion&id=${id}`)
        .then(resultado => setOperacion(resultado.data)).catch(err => console.error(err)); 

        axios.get(`${url}controllers.operaciones.php`)
        .then(resultado => {setOperaciones(resultado.data);setPending(false)}).catch(err => console.error(err));

    }, [id]);

    return {
        agregarProducto,
        productosMovimiento,
        quitarProducto,
        actualizarProducto,
        operacion,
        operaciones,
        pending,
        actualizarOperacion,
        autorizarOperacion,
        loadSaveOP,
    }
}

export default useOperaciones;