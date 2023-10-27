import React from "react";

interface InfosClinicaProps {
  nomeClinica: string;
  qualidadesClinica: string;
  textoAntesServsClinica: string;
  servsRealizadosClinica: string;
  infosRelevantesClinica: string;
  valoresClinica: string;
  missaoClinica: string;
}

export default function InfosClinica({
  nomeClinica,
  qualidadesClinica,
  textoAntesServsClinica,
  servsRealizadosClinica,
  infosRelevantesClinica,
  valoresClinica,
  missaoClinica,
}: InfosClinicaProps) {
  function renderizarListaServicosClinica() {
    return servsRealizadosClinica.split(";").map(
      (x, i) =>
        x !== "" && (
          <li className="pl-[.5rem]" key={i}>
            • {x}
          </li>
        )
    );
  }
  function renderizarListaValores() {
    return valoresClinica.split(";").map(
      (x, i) =>
        x !== "" && (
          <li className="pl-[.5rem]" key={i}>
            • {x}.
          </li>
        )
    );
  }
  return (
    <section>
      <span className="text-2xl">Sobre a {nomeClinica ?? ""}</span>
      <div className="max-w-[95%] pb-[1rem]">
        {/* ORGANIZAR EM: */}
        {/* O QUE É A CLÍNICA E SUAS QUALIDADES (EM 1 ÚNICO PARÁGRAFO) */}
        <p className="pt-[.5rem]">{qualidadesClinica}</p>
        <p className="pt-[.5rem]">{textoAntesServsClinica}</p>
        {/* TEXTO ANTES DOS SERVIÇOS REALIZADOS */}
        {/* SERVIÇOS REALIZADOS (ORGANIZADO EM TÓPICOS) */}
        <ul>{renderizarListaServicosClinica()}</ul>
        {/* MAIS 1 PARÁGRAFO SOBRE DIFERENCIAIS E/OU INFOS QUE ACHAR RELEVANTES */}
        <p className="pt-[.5rem]">{infosRelevantesClinica}</p>
        {/* TÓPICO SOBRE VALORES DA CLÍNICA */}
        <span className="inline-block pt-[.5rem]">Nossos valores</span>
        <ul>{renderizarListaValores()}</ul>
        {/* MAIS 1 PARÁGRAFO SOBRE MISSÃO */}
        <span className="inline-block pt-[.5rem]">Nossa missão</span>
        <p className="pl-[.5rem]">{missaoClinica}</p>
      </div>
    </section>
  );
}
