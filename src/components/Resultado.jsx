import useCotizador from "../hooks/useCotizador";
import { MARCAS, PLANES } from "../constants";
import { useCallback } from "react";

const Resultado = () => {
  const { resultado, datos } = useCotizador();
  const { marca, year, plan } = datos;

  if (resultado === 0) return null;
  return (
    <div className="bg-gray-100 text-center mt-5 p-5 shadow">
      <h2 className="text-gray-700 font-black text-3xl">Resumen</h2>
      <p className="my-2">
        <span className="font-bold w-full">
          Marca: {MARCAS.find((m) => m.id == marca)?.nombre}{" "}
        </span>
      </p>
      <p className="my-2">
        <span className="font-bold w-full">Año: {year} </span>
      </p>
      <p className="my-2">
        <span className="font-bold">
          Plan: {PLANES.find((m) => m.id == plan)?.nombre}{" "}
        </span>
      </p>
      <p className="my-2">
        <span className="font-bold">
          Cotizacion: {resultado}
        </span>
      </p>
    </div>
  );
};

export default Resultado;
