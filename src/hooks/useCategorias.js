import axios from "axios"
import { useState, useEffect } from "react"
import Swal from "sweetalert2";
const url = import.meta.env.VITE_URL + "controllers/controllers.categorias.php";

const useCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [categoriaSelect, setCategoriaSelect] = useState({});
    const [subs, setSubs] = useState([]);

    const obtenerDatos = () => {
        axios.get(url).then(response => {
            setCategorias(response.data.categorias);
            setSubs(response.data.subcategorias);
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                                 CATEGORIAS                                 */
    /* -------------------------------------------------------------------------- */
    const agregarCategoria = (data) => {
        const formData = new FormData();
        formData.append("categoria",data.categoria);
        axios.post(`${url}`, formData)
        .then(response=>{
            if(response.status == 200){
                axios.get(url).then(response => {
                    setCategorias(response.data.categorias)
                });
                Swal.fire({
                    title: "Categoría agregada",
                    text: "Se ha agregado una nueva categoría",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 3000
                })
            }
        })
    }

    const seleccionarCategoria = (categoria) => {
        setCategoriaSelect(categoria);
    }

    const actualizarCategoria = ({formData, categoria, id}) => {
        Swal.fire({
            title: "¿Actualizar categoría?",
            text: "Si actualizas esta categoría se actualizará también en los productos que esten registrados con esta misma.",
            icon: "question",
            cancelButtonText: "Cancelar (No)",
            confirmButtonText: "Actualizar (Si)",
            showConfirmButton: true,
            showCancelButton: true
        }).then(response => {
            if(response.isConfirmed){
                axios.post(`${url}?update&categoria=${categoria}&id=${id}`, formData)
                .then(response => {
                    if(response.data.id){
                        obtenerDatos()
                        Swal.fire({
                            timer: 2000,
                            icon: "success",
                            title: "Actualizado",
                            showConfirmButton: false
                        })
                    }
                })
                .catch(err => console.log(err))
            }
        })
    }

    const eliminarCategoria = (data) => {

        Swal.fire({
            title: "¿Seguro de eliminar?",
            text: "Esta categoría será eliminada permanentemente.",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: "Eliminar (Si)",
            cancelButtonText: "Cancelar (No)",
        }).then(response => {
            if(response.isConfirmed){
                axios.post(`${url}?delete&categoria=${data.categoria}&id=${data.id}`)
                .then(response => {
                    const {message} = response.data;
                    obtenerDatos();
                    if(message === "Success"){
                        Swal.fire({
                            title: "Eliminado",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000
                        })
                    }else{
                        Swal.fire({
                            title: "No se puede eliminar",
                            text: message,
                            icon: "error",
                            confirmButtonText: "Entendido"
                        })
                    }
                })
                .catch(err => console.log(err))
            }
        })
    }

    /* -------------------------------------------------------------------------- */
    /*                                SUBCATEGORIAS                               */
    /* -------------------------------------------------------------------------- */
    const agregarSubcategoria = (data) => {
        const formData = new FormData();
        formData.append("subcategoria", data.subcategoria);
        axios.post(`${url}?subcategoria&id=${categoriaSelect.id}`, formData)
        .then(response => {
            if(response.status == 200){   
                axios.get(url).then(request => setSubs(request.data.subcategorias));
                Swal.fire({
                    title: "Subcategoria agregada",
                    text: `Se agrego una subcategoria a ${categoriaSelect.categoria}`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                })
            }
        });
    }

    const actualizarSubcategoria = ({data, formData}) => {
        Swal.fire({
            title: "¿Actualizar subcategoría?",
            text: "Si actualizas la subcategoría también se actualizará en los productos de esta misma.",
            showCancelButton: true,
            showConfirmButton: true,
            cancelButtonText: "Cancelar (No)",
            confirmButtonText: "Actualizar (Sí)"
        }).then(response => {
            if(response.isConfirmed){
                axios.post(`${url}?update&subcategoria=${data.subcategoria}&id=${data.id}`, formData)
                .then(response => {
                    console.log(response.data);
                    Swal.fire({
                        title: "Actualizada",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    })
                    axios.get(url).then(request => setSubs(request.data.subcategorias));
                })
                .catch(err => console.log(err));
            }
        })
    }


    const eliminarSubcategoria = (data) => {
        console.table(data)
        Swal.fire({
            title: "¿Eliminar subcategoría?",
            text: "La subcategoría será eliminada permanentemente, ¿seguro que deseas proceder?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Eliminar (Sí)",
            cancelButtonText: "Cancelar (No)",
        }).then(response => {
            if(response.isConfirmed){
                axios.post(`${url}?delete&subcategoria=${data.subcategoria}&id=${data.id}&cat=${data.categoria}`)
                .then(response => {
                    console.log(response)
                    const { message } = response.data;
                    if( message === "Success" ){
                        Swal.fire({
                            title: "Eliminado",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton:false
                        });
                        axios.get(url).then(request => setSubs(request.data.subcategorias));
                    }else{
                        Swal.fire({
                            title: "No se pudo eliminar",
                            text: message,
                            icon: "error",
                            confirmButtonText: "Entendido"
                        })

                    }
                })
                .catch(err => console.log(err));
            }
        })
    }


    useEffect(() => {
        if(categoriaSelect){
            setSubcategorias(subs.filter(item => item.id_categoria == categoriaSelect.id));
        }
    }, [categoriaSelect, subs])

    useEffect(() => {
        axios.get(url).then(response => {
            setCategorias(response.data.categorias);
            setSubs(response.data.subcategorias);
        });
    }, [])

    return {
        categorias,
        subcategorias,
        agregarCategoria,
        actualizarCategoria,
        actualizarSubcategoria,
        eliminarCategoria,
        eliminarSubcategoria,
        agregarSubcategoria,
        seleccionarCategoria,
        categoriaSelect,
    }
}


export default useCategorias;