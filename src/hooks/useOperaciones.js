import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const url = import.meta.env.VITE_URL + 'controllers/';
const useOperaciones = () => {

    const {id} = useParams();
    const [productosMovimiento, setProductosMovimiento] = useState([]);  
    const [operaciones, setOperaciones] = useState([]);
    const [operacion, setOperacion] = useState({});

    console.log(id);
    // SECTION OPERACION

    const obtenerProductos = () => {
        axios.get(`${url}controllers.operaciones.php?productos_movimiento&id=${id}`)
        .then(respuesta => {
            const {data} = respuesta;
            console.log(respuesta);
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
            console.log(resultado);
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

    // LINK ACTUALIZAR OPERACION

    const actualizarOperacion = (data) =>{
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
            }
        })
        .catch(err => console.error(err));
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
        .then(resultado => setOperaciones(resultado.data)).catch(err => console.error(err));

    }, [id]);

    return {
        agregarProducto,
        productosMovimiento,
        quitarProducto,
        actualizarProducto,
        operacion,
        operaciones,
        actualizarOperacion,
    }
}

export default useOperaciones;