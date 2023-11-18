import axios from "axios"
import { useState, useEffect } from "react"
import Swal from "sweetalert2";
const url = import.meta.env.VITE_URL + "controllers/controllers.categorias.php";

const useCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [categoriaSelect, setCategoriaSelect] = useState({});
    const [subs, setSubs] = useState([]);

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
        agregarSubcategoria,
        seleccionarCategoria,
        categoriaSelect,
    }
}


export default useCategorias;