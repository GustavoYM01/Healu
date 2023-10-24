import React from "react";
import MostradorEstrelas from "../MostradorEstrelas/MostradorEstrelas";

interface CardAvaliacoesClinicaProps {
  avaliacaoMedia: number;
}

export default function CardAvaliacoesClinica({
  avaliacaoMedia,
}: CardAvaliacoesClinicaProps) {
  function renderizarBarrasAvaliacao() {
    return Array.from(
      { length: 6 },
      (_, index) =>
        index !== 0 && (
          <div className="flex items-center gap-2" key={index}>
            <p>{6 - index}</p>
            {String(6 - index) === String(Math.ceil(avaliacaoMedia)) &&
            Number(String(avaliacaoMedia).split(".")[1]) < 5 ? (
              <div className="flex w-[10rem] h-2">
                <div className="w-[30%] h-full bg-[#2642D9] rounded-l-md"></div>
                <div className="w-[70%] h-full bg-[#CED2E4] rounded-r-md"></div>
              </div>
            ) : String(6 - index) === String(Math.ceil(avaliacaoMedia)) &&
              Number(String(avaliacaoMedia).split(".")[1]) >= 7 ? (
              <div className="flex w-[10rem] h-2">
                <div className="w-[80%] h-full bg-[#2642D9] rounded-l-md"></div>
                <div className="w-[20%] h-full bg-[#CED2E4] rounded-r-md"></div>
              </div>
            ) : String(6 - index) === String(Math.ceil(avaliacaoMedia)) &&
              Number(String(avaliacaoMedia).split(".")[1]) < 7 ? (
              <div className="flex w-[10rem] h-2">
                <div className="w-1/2 h-full bg-[#2642D9] rounded-l-md"></div>
                <div className="w-1/2 h-full bg-[#CED2E4] rounded-r-md"></div>
              </div>
            ) : String(6 - index) === String(avaliacaoMedia).split(".")[0] ? (
              <div className="w-[10rem] h-2 rounded-md bg-[#2642D9]"></div>
            ) : (
              <div className="w-[10rem] h-2 rounded-md bg-[#CED2E4]"></div>
            )}
          </div>
        )
    );
  }
  return (
    <div
      className="
    bg-[#EFF2FC] max-h-[10rem] p-4
    rounded-lg
    "
    >
      <div className="flex items-center gap-[2rem]">
        <div className="flex flex-col items-center gap-[.5rem]">
          <span className="text-4xl">{avaliacaoMedia}</span>
          <div>
            <MostradorEstrelas
              qtdEstrelas={5}
              mediaAvaliacao={avaliacaoMedia}
              className="gap-[.3rem]"
            />
          </div>
          <div className="text-sm">X Avaliações</div>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center">
            {renderizarBarrasAvaliacao()}
          </div>
        </div>
      </div>
    </div>
  );
}
