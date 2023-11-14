import React from "react";
import Nutrife from "../../assets/clinica-nutrife.jpg";
import Pedivida from "../../assets/clinica-pedivida.jpg";
import Ortomove from "../../assets/clinica-ortomove.jpg";
import Gynelogic from "../../assets/clinica-gynelogic.jpg";
import DeMelo from "../../assets/clinica-demelo.jpg";
import CardioExcel from "../../assets/clinica-cardioexcel.jpg";
import Dermello from "../../assets/dermelo2.jpg";
import Image from "next/image";
import MostradorEstrelas from "../MostradorEstrelas/MostradorEstrelas";
import { doc, getDoc } from "firebase/firestore";
import { firebase } from "@/firebase/config";

interface ItemGridClinicaProps {
  nomeClinica: string;
  uf: string;
  especialidade: string;
  avaliacaoMedia: number;
  key: any;
}

export default function ItemGridClinica(props: ItemGridClinicaProps) {

  function unidadeFederativaPorExtenso(uf: string) {
    return uf.toLowerCase().includes("sp")
      ? "São Paulo"
      : uf.toLowerCase().includes("rj")
      ? "Rio de Janeiro"
      : uf.toLowerCase().includes("df")
      ? "Brasília"
      : "";
  }
  async function obterDadosClinica(nomeClinica: string) {
    await getDoc(doc(firebase.db, "clinica", nomeClinica.toLowerCase()))
      .then((x) => {
        if (x.exists()) location.href = `clinica/${x.data().id}`;
      })
      .catch((e) => console.log(e));
  }
  return (
    <div
      className="relative bg-[#EFF2FC] rounded-md cursor-pointer"
      onClick={(e: any) => obterDadosClinica(props.nomeClinica)}
    >
      <Image
        className="rounded-t-lg max-h-[320px]"
        src={
          props.nomeClinica.toLowerCase().includes("nutrife")
            ? Nutrife
            : props.nomeClinica.toLowerCase().includes("pedivida")
            ? Pedivida
            : props.nomeClinica.toLowerCase().includes("ortomove")
            ? Ortomove
            : props.nomeClinica.toLowerCase().includes("gynelogic")
            ? Gynelogic
            : props.nomeClinica.toLowerCase().includes("demelo")
            ? DeMelo
            : props.nomeClinica.toLowerCase().includes("cardioexcel")
            ? CardioExcel
            : props.nomeClinica.toLowerCase().includes("dermello")
            ? Dermello
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
            <MostradorEstrelas
              qtdEstrelas={5}
              mediaAvaliacao={props.avaliacaoMedia}
            />
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
