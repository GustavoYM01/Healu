import React from "react";
import Nutrife from "../../assets/clinica-nutrife.jpg";
import Pedivida from "../../assets/clinica-pedivida.jpg";
import Ortomove from "../../assets/clinica-ortomove.jpg";
import Image from "next/image";
import MostradorEstrelas from "../MostradorEstrelas/MostradorEstrelas";

interface ItemGridClinicaProps {
  nomeClinica: string;
  uf: string;
  especialidade: string;
}

export default function ItemGridClinica(props: ItemGridClinicaProps) {
  function unidadeFederativaPorExtenso(uf: string) {
    return uf.toLowerCase().includes("sp")
      ? "São Paulo"
      : uf.toLowerCase().includes("rj")
      ? "Rio de Janeiro"
      : "";
  }
  return (
    <div className="relative bg-[#EFF2FC] rounded-md">
      <Image
        className="rounded-t-lg"
        src={
          props.nomeClinica.toLowerCase().includes("nutrife")
            ? Nutrife
            : props.nomeClinica.toLowerCase().includes("pedivida")
            ? Pedivida
            : props.nomeClinica.toLowerCase().includes("ortomove")
            ? Ortomove
            : ""
        }
        alt=""
      />
      <div className="px-2">
        <div className="flex items-center justify-between">
          {/* NOME CLÍNICA E UF */}
          <div>
            <span className="inline-block font-semibold text-xl mt-2">
              {props.nomeClinica}
            </span>
            <span className="block">
              {unidadeFederativaPorExtenso(props.uf) + " - " + props.uf}
            </span>
          </div>
          {/* MOSTRADOR ESTRELAS */}
          <div className="flex items-center">
            <MostradorEstrelas />
            <MostradorEstrelas />
            <MostradorEstrelas />
            <MostradorEstrelas />
            <MostradorEstrelas />
          </div>
        </div>
        {/* ESPECIALIDADE CLÍNICA */}
        <span
          className="
        inline-block 
        bg-[#CED2E4] 
        py-[.1rem] px-1 rounded-md
        mt-[2rem] mb-[.5rem]
        "
        >
          {props.especialidade}
        </span>
      </div>
    </div>
  );
}
