import { useState, useEffect } from "react";

const useSession = () => {
    const [deviceCurrent, setDeviceCurrent] = useState('');
    const [systemOperative, setSystemOperative] = useState('');
    useEffect(() => {
        let sistemaOperativo = navigator.userAgentData?.platform;
        sistemaOperativo = sistemaOperativo ? sistemaOperativo : navigator.platform;
        const dispositivo = /Mobile|Tablet|iPad|iPhone|Android/.test(navigator.userAgent) ? "Mobile Device" : "Desktop";
        setSystemOperative(sistemaOperativo);
        setDeviceCurrent(dispositivo);
        console.log(deviceCurrent)
    }, [])

    return {
        systemOperative,
        deviceCurrent,
    }
}

export default useSession;