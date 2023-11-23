import React from "react";
import { CamposFiltros } from "@/models/CamposFiltro";

interface ItemGridEspecialidadeProps {
  especialidade: string;
  funcaoDefinirEspecialidade: (especialidades: CamposFiltros) => void;
  mostrarBtnLimparFiltros: (mostrarBtn: boolean) => void;
}

export default function ItemGridEspecialidade(
  props: ItemGridEspecialidadeProps
) {
  return (
    <div
      className={`
      bg-[#EFF2FC] p-4 
      rounded-lg font-semibold
      text-lg
      cursor-pointer
      ${window.innerWidth < 600 && `w-[45vw] text-center`}`}
      onClick={() => {
        props.funcaoDefinirEspecialidade({
          cidade: "",
          especialidade: props.especialidade.toLowerCase(),
          estado: "",
        });
        props.mostrarBtnLimparFiltros(true);
      }}
    >
      {props.especialidade}
    </div>
  );
}
