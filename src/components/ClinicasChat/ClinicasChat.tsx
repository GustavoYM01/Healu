import { useState } from "react";
import Nutrife from "../../assets/clinica-nutrife.jpg";
import Pedivida from "../../assets/clinica-pedivida.jpg";
import Ortomove from "../../assets/clinica-ortomove.jpg";
import Gynelogic from "../../assets/clinica-gynelogic.jpg";
import DeMelo from "../../assets/clinica-demelo.jpg";
import CardioExcel from "../../assets/clinica-cardioexcel.jpg";
import Dermello from "../../assets/dermelo2.jpg";
import Loading from "../../assets/loading-spinner.gif";
import Image from "next/image";

interface ClinicasChatProps {
  className?: string;
  arrClinicas: string[];
}

export default function ClinicasChat({
  className,
  arrClinicas,
}: ClinicasChatProps) {
  const [selecionado, setSelecionado] = useState<number | null>(null);
  return (
    <div className={`${className} cursor-pointer`}>
      {!(arrClinicas.length > 0) ? (
        <div className="flex flex-col items-center">
          <Image className="max-w-[10rem]" src={Loading} alt="" />
        </div>
      ) : (
        arrClinicas.map((x, i) => (
          <div
            key={i}
            onClick={() => setSelecionado(i)}
            className={`
          flex items-center gap-[.5rem] 
          mb-[.5rem] py-2 px-[.5rem]
          rounded-lg
          transition-all ease-in-out
          ${selecionado === i && "bg-[#EFF2FC]"}
          `}
          >
            <div>
              <Image
                className="w-[2.5rem] h-[2.5rem] rounded-full"
                src={
                  x.toLowerCase().includes("nutrife")
                    ? Nutrife
                    : x.toLowerCase().includes("pedivida")
                    ? Pedivida
                    : x.toLowerCase().includes("ortomove")
                    ? Ortomove
                    : x.toLowerCase().includes("gynelogic")
                    ? Gynelogic
                    : x.toLowerCase().includes("demelo")
                    ? DeMelo
                    : x.toLowerCase().includes("cardioexcel")
                    ? CardioExcel
                    : x.toLowerCase().includes("dermello")
                    ? Dermello
                    : ""
                }
                alt=""
              />
            </div>
            <p>{x}</p>
          </div>
        ))
      )}
    </div>
  );
}
