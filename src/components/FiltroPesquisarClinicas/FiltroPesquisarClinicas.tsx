import React, { useEffect, useState } from "react";
import Notificacoes from "../Notificacoes/Notificacoes";
import Usuario from "../Usuario/Usuario";
import { collection, getDocs, query } from "firebase/firestore";
import { firebase } from "@/firebase/config";
import { CamposFiltros } from "@/models/CamposFiltro";

interface FiltroPesquisarClinicasProps {
  funcaoCallBack: (especialidades: CamposFiltros) => void;
  limpar: boolean;
  alterarLimpar: (mostrar: boolean) => void;
}

export default function FiltroPesquisarClinicas(
  props: FiltroPesquisarClinicasProps
) {
  const [estado, setEstado] = useState(new Set());
  const [cidade, setCidade] = useState(new Set());
  const [mostrarLimparFiltros, setMostrarLimparFiltros] = useState(false);
  const [camposFiltro, setCamposFiltro] = useState<CamposFiltros>({
    cidade: "",
    estado: "",
    especialidade: "",
  });

  function renderizarEstados() {
    if (estado.size > 0) {
      return Array.from(estado).map((x: any, i: any) => (
        <option key={i} value={x}>
          {x}
        </option>
      ));
    }
  }

  function renderizarCidades() {
    if (cidade.size > 0) {
      return Array.from(cidade).map((x: any, i: any) => (
        <option key={i} value={x}>
          {x}
        </option>
      ));
    }
  }

  async function obterEstadosClinicas() {
    const estadosSet = new Set();
    const querySnapshot = await getDocs(
      query(collection(firebase.db, "clinica"))
    );
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const estado = doc.data().estado;
        estadosSet.add(estado);
      });
      setEstado(estadosSet);
    }
  }

  async function obterCidadesClinicas() {
    const cidadeSet = new Set();
    const querySnapshot = await getDocs(
      query(collection(firebase.db, "clinica"))
    );
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        const cidade = doc.data().cidade;
        cidadeSet.add(cidade);
      });
      setCidade(cidadeSet);
    }
  }

  function submitForm(e: any) {
    e.preventDefault();
    props.alterarLimpar(true);
    if (Object.values(camposFiltro).some((x) => x.trim() !== "")) {
      props.funcaoCallBack(camposFiltro);
    }
  }

  function limparFiltros() {
    setCamposFiltro({
      cidade: "",
      estado: "",
      especialidade: "",
    });
    props.funcaoCallBack({} as CamposFiltros);
    setMostrarLimparFiltros(false);
    props.alterarLimpar(false);
  }

  useEffect(() => {
    obterEstadosClinicas();
    obterCidadesClinicas();
  }, [mostrarLimparFiltros, props.limpar]);

  return (
    <section
      className="
      w-[calc(100%-240px)]
      fixed top-0 left-[240px]
      z-10
      min-h-fit
      "
    >
      <form
        className="
        flex justify-between items-center gap-[1rem] mt-[1rem]
        "
        onSubmit={(e) => submitForm(e)}
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
              value={camposFiltro.estado}
              onChange={(e) =>
                setCamposFiltro({ ...camposFiltro, estado: e.target.value })
              }
            >
              <option className="font-medium" value="">
                Estado
              </option>
              {renderizarEstados()}
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
              value={camposFiltro.cidade}
              onChange={(e) =>
                setCamposFiltro({ ...camposFiltro, cidade: e.target.value })
              }
            >
              <option className="font-medium" value="">
                Cidade
              </option>
              {renderizarCidades()}
            </select>
          </div>
          {/* ESPECIALIDADE */}
          <div className="relative">
            <input
              className="
              bg-[#EFF2FC]
              rounded-md
              w-[25rem] outline-none 
              py-2 pl-2 pr-[3rem]
              "
              type="text"
              placeholder="Especialidade"
              value={camposFiltro.especialidade}
              onChange={(e) =>
                setCamposFiltro({
                  ...camposFiltro,
                  especialidade: e.target.value,
                })
              }
            />
            <svg
              className="
              absolute right-[1rem] top-[.3rem]
              cursor-pointer
              "
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              onClick={(e: any) => submitForm(e)}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.1647 17.4567 13.7039 16.5391 14.9481L20.6705 19.0795C21.1098 19.5188 21.1098 20.2312 20.6705 20.6705C20.2312 21.1098 19.5188 21.1098 19.0795 20.6705L14.9481 16.5391C13.7039 17.4567 12.1647 18 10.5 18C6.35786 18 3 14.6421 3 10.5ZM10.5 5.25C7.6005 5.25 5.25 7.6005 5.25 10.5C5.25 13.3995 7.6005 15.75 10.5 15.75C11.9501 15.75 13.261 15.1636 14.2123 14.2123C15.1636 13.261 15.75 11.9501 15.75 10.5C15.75 7.6005 13.3995 5.25 10.5 5.25Z"
                fill="#222222"
              />
            </svg>
          </div>
          {mostrarLimparFiltros ||
            (props.limpar && (
              <div>
                <button
                  onClick={limparFiltros}
                  className="bg-[#EFF2FC] p-2 rounded-md"
                >
                  Limpar filtros
                </button>
              </div>
            ))}
        </div>
        <div className="flex items-center gap-[1rem] mr-[2rem]">
          <Notificacoes />
          <Usuario />
        </div>
      </form>
    </section>
  );
}
