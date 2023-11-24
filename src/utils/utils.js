export const formatDate = ({datetime}) => {
    const newDateTime = new Date(datetime);

    const optionsDate = {year: 'numeric', month:'long', day:'numeric'};
    const optionsTime = {hour:'2-digit', minute:'2-digit', second:'2-digit'};

    const dateFormat = newDateTime.toLocaleDateString('es-ES', optionsDate);
    const timeFormat = newDateTime.toLocaleTimeString('es-ES', optionsTime);

    return {
        date: dateFormat,
        time: timeFormat
    }
}

export const formatPriceMX = (monto) => {
    monto = parseFloat(monto);
    return monto.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
        minimunFractionDigits: 2,
    });
}

export const expRegs = {
    codigos     : /^[a-zA-Z0-9.-]+$/,
    parrafos    : /^[a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s.,;:'"¡!¿?()¿&@$#%*-]+$/u,
    password    : /^(?=.*[A-Z])(?=.*[-_.])(?=.*\d)[a-zA-Z\d-_.]{8,}$/,
}