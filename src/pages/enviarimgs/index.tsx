import { verificarAutenticado } from "@/functions/verificarUsuarioAutenticado";
import React, { useEffect, useState } from "react";
import Loading from "../../assets/loading-spinner.gif";
import Image from "next/image";

export default function EnviarImagens() {
  const [carregando, setCarregando] = useState(true);
  useEffect(() => {
    if (verificarAutenticado()) {
      setCarregando(false);
      return;
    }
    location.href = "/";
  }, []);
  return carregando ? (
    <div className="flex flex-col items-center">
      <Image src={Loading} alt="" />
    </div>
  ) : (
    <div>Envie imagens da sua clínica</div>
  );
}
