import React from "react";

interface ItemGridEspecialidadeProps {
  especialidade: string;
}

export default function ItemGridEspecialidade(
  props: ItemGridEspecialidadeProps
) {
  return (
    <div
      className="
    bg-[#EFF2FC] p-4 
    rounded-lg font-semibold
    text-lg
    "
    >
      {props.especialidade}
    </div>
  );
}
