import React from "react";
import Notificacoes from "../Notificacoes/Notificacoes";
import Usuario from "../Usuario/Usuario";

export default function FiltroPesquisarClinicas() {
  return (
    <section
      className="
      w-[calc(100%-240px)]
      fixed top-0 left-[240px]
      z-10
      min-h-fit
      "
    >
      <div
        className="
      flex justify-between items-center gap-[1rem] mt-[1rem]
      "
      >
        <div className="flex items-center gap-[1rem] ml-[1rem]">
          {/* ESTADO */}
          <div>
            <select
              className="
        font-medium
        bg-[#EFF2FC] outline-none
        rounded-md p-2
        "
            >
              <option className="font-medium" value="">
                Estado
              </option>
              <option className="font-medium" value="SP">
                SP
              </option>
              <option className="font-medium" value="DF">
                DF
              </option>
              <option className="font-medium" value="RJ">
                RJ
              </option>
              <option className="font-medium" value="MG">
                MG
              </option>
              <option className="font-medium" value="AM">
                AM
              </option>
            </select>
          </div>
          {/* CIDADE */}
          <div>
            <select
              className="
        font-medium
        bg-[#EFF2FC] outline-none
        rounded-md p-2
        "
            >
              <option className="font-medium" value="">
                Cidade
              </option>
              <option className="font-medium" value="Sorocaba">
                Sorocaba
              </option>
              <option className="font-medium" value="Votorantim">
                Votorantim
              </option>
              <option className="font-medium" value="Itu">
                Itu
              </option>
              <option className="font-medium" value="Ipero">
                Iperó
              </option>
              <option className="font-medium" value="Piedade">
                Piedade
              </option>
            </select>
          </div>
          {/* ESPECIALIDADE */}
          <div className="relative">
            <input
              className="
        bg-[#EFF2FC]
        rounded-md
        w-[25rem] outline-none p-2
        "
              type="text"
              placeholder="Especialidade"
            />
            <svg
              className="absolute right-[1rem] top-[.5rem]"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.1647 17.4567 13.7039 16.5391 14.9481L20.6705 19.0795C21.1098 19.5188 21.1098 20.2312 20.6705 20.6705C20.2312 21.1098 19.5188 21.1098 19.0795 20.6705L14.9481 16.5391C13.7039 17.4567 12.1647 18 10.5 18C6.35786 18 3 14.6421 3 10.5ZM10.5 5.25C7.6005 5.25 5.25 7.6005 5.25 10.5C5.25 13.3995 7.6005 15.75 10.5 15.75C11.9501 15.75 13.261 15.1636 14.2123 14.2123C15.1636 13.261 15.75 11.9501 15.75 10.5C15.75 7.6005 13.3995 5.25 10.5 5.25Z"
                fill="#222222"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center gap-[1rem] mr-[2rem]">
          <Notificacoes />
          <Usuario />
        </div>
      </div>
    </section>
  );
}
