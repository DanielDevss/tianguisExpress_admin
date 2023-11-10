import {useState, useEffect} from "react";
import { dataExample } from "../data/data";

const useDataExample = () => {
  
    const [example, setExample] = useState()

    const obtenerDatos = async() => {
        const data = await dataExample();
        setExample(data);
        console.log(data[0]);
    }

    useEffect(() => {
        obtenerDatos();
    }, [])
  
    return {
        example
    }
}

export default useDataExample