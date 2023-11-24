import PropTypes from "prop-types";
import {SiMicrosoftexcel} from "react-icons/si";
import {PiPlusBold} from "react-icons/pi";
import {Link} from "react-router-dom";
import tippy from "tippy.js";

import * as XLSX from "xlsx";
import { useEffect, useRef } from "react";


const CustomHeader = ({title, btnAdd = false, toBtnAdd, searchOnChange, placeholder, downloadOptions}) => {
    
    const downloadbtn = useRef(null);
    const agregarbtn = useRef(null);

    const handleDownload = () => {
        const date = new Date();
        const day = date.getDay();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formatDate = `${day < 10 ? "0" + day : day}-${month}-${year}`;
        const {data, sheetname, filename} = downloadOptions;
        const book = XLSX.utils.book_new();
        const sheet = XLSX.utils.json_to_sheet(data);
        // const sheet = XLSX.utils.json_to_sheet([
        //     [{t: "s", v:`Fecha de Descarga: ${formatDate}`}],
        //     [],
        //     ...data
        // ]);
        XLSX.utils.book_append_sheet(book, sheet, sheetname);
        XLSX.writeFile(book, `${filename}_${formatDate}.xlsx`)
    }


    useEffect(() => {
        tippy(agregarbtn.current, {content: "Agregar Registro"})
        tippy(downloadbtn.current, {content: "Descargar en Excel"})
    }, [])

    return (
        <header className="d-flex justify-content-between">
            <h3 className="mx-0 h5">{title}</h3>
            <div className="d-flex gap-2">
                <input onChange={searchOnChange} type="search" className="form-control" placeholder={`🔎 ${placeholder}`} />

                <button ref={downloadbtn} onClick={handleDownload} className="btn btn-success"><SiMicrosoftexcel className="mb-1" /></button>
                
                {btnAdd && <Link ref={agregarbtn} to={toBtnAdd} className="btn btn-primary"><PiPlusBold className="mb-1" /></Link>}
            </div>
        </header>
    )
}

CustomHeader.propTypes = {
    title: PropTypes.string,
    btnAdd: PropTypes.bool,
    toBtnAdd: PropTypes.string,
    searchOnChange: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
    downloadOptions: PropTypes.object
}

export default CustomHeader