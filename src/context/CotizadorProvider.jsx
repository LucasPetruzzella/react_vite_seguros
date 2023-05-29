import { createContext, useState, useEffect } from "react";
import { obtenerDiferenciaYear, calcularMarca,calcularPlan,formatearDinero } from "../helpers";

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {
    const [cargando,setCargando] = useState(false)
    const [datos, setDatos] = useState({
        marca: "",
        year: "",
        plan: ""
    })
    const [error,setError] = useState("")
    const handleChangeDatos = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }
    const [resultado, setResultado] = useState()

    const cotizarSeguro = () => {
        setCargando(true)
        // Una base
        let resultado = 2000

        // Diferencia de años
        const dif = obtenerDiferenciaYear(datos.year)
        // Hay que restar 3% por año
        const rebajeAntiguedad = ((dif * 3) * resultado) / 100
        resultado =resultado - rebajeAntiguedad

        // Americano +15%
        // Europeo 30%
        // Asiatico 5%
        const factorMarca = calcularMarca(datos.marca)
        resultado = resultado * factorMarca
        
        // Basico 20%
        // Completo 50%
        const factorPlan = calcularPlan(datos.plan)
        resultado = resultado * factorPlan
        
        resultado = formatearDinero(resultado)

        setResultado(resultado)
        setTimeout(() => {
            setCargando(false)
        },3000)
        
    }

    useEffect(() => {
        if(!Object.values(datos).includes('')){
            cotizarSeguro()
        }
        
    },[datos])

    return (
        <CotizadorContext.Provider
            value={{
                handleChangeDatos,
                datos,
                error,
                setError,
                cotizarSeguro,
                resultado,
                cargando
                
            }}
            >
            {children}
        </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext