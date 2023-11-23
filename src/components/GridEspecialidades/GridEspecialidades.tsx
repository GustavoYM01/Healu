import React from "react";

interface GridEspecialidadesProps {
  children: any;
}

export default function GridEspecialidades(props: GridEspecialidadesProps) {
  return (
    <section
      className={`${
        window.innerWidth < 600
          ? `w-[95%] mx-auto mt-[1.5rem]`
          : `w-[calc(100%-240px)]
      absolute top-[32rem] left-[260px]`
      }`}
    >
      {props.children}
    </section>
  );
}
