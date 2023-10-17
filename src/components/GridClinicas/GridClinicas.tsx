import React from "react";
import ItemGridClinica from "../ItemGridClinica/ItemGridClinica";

export default function GridClinicas() {
  return (
    <section
      className="
    w-[calc(100%-240px)] pb-[10rem]
    absolute top-[42rem] left-[260px]
    "
    >
      <div
        className="
      max-w-[63rem] 
      flex flex-wrap 
      items-center gap-[1rem]
      "
      >
        <ItemGridClinica
          nomeClinica="Nutrife"
          uf="SP"
          especialidade="Nutrição"
        />
        <ItemGridClinica
          nomeClinica="Pedivida"
          uf="SP"
          especialidade="Pediatria"
        />
        <ItemGridClinica
          nomeClinica="Ortomove"
          uf="RJ"
          especialidade="Ortopedia"
        />
      </div>
    </section>
  );
}
