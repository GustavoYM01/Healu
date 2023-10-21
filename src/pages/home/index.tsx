import PesquisarUsuarios from "@/components/pesquisarUsuarios";
import UserCtx from "@/contexts/UserContext";
import { sair } from "@/firebase/funcoes";
import { useContext, useEffect, useState } from "react";
import Loading from "../../assets/loading-spinner.gif";
import Image from "next/image";
import { verificarAutenticado } from "@/functions/verificarUsuarioAutenticado";
import MenuLateral from "@/components/menuLateral/MenuLateral";
import FiltroPesquisarClinicas from "@/components/FiltroPesquisarClinicas/FiltroPesquisarClinicas";
import CarouselClinicas from "@/components/CarouselClinicas/CarouselClinicas";
import GridEspecialidades from "@/components/GridEspecialidades/GridEspecialidades";
import ItemGridEspecialidade from "@/components/ItemGridEspecialidade/ItemGridEspecialidade";
import GridClinicas from "@/components/GridClinicas/GridClinicas";
import { CamposFiltros } from "@/models/CamposFiltro";

export default function Principal() {
  const [carregando, setCarregando] = useState(true);
  const [objCamposFiltrados, setObjCamposFiltrados] = useState(
    {} as CamposFiltros
  );

  useEffect(() => {
    if (verificarAutenticado()) {
      setCarregando(false);
      return;
    }
    location.href = "/";
  }, []);

  return carregando ? (
    <div className="flex flex-col items-center">
      <Image src={Loading} alt="" />
    </div>
  ) : (
    <div>
      <MenuLateral />
      <FiltroPesquisarClinicas funcaoCallBack={setObjCamposFiltrados} />
      {!(
        Object.values(objCamposFiltrados).length > 0 &&
        Object.values(objCamposFiltrados).some((x) => x.trim() !== "")
      ) && (
        <>
          <CarouselClinicas />
          <GridEspecialidades>
            <div className="max-w-[63rem] flex flex-wrap items-center gap-[1rem]">
              <ItemGridEspecialidade especialidade="Clínico Geral" />
              <ItemGridEspecialidade especialidade="Ginecologia" />
              <ItemGridEspecialidade especialidade="Ortopedia" />
              <ItemGridEspecialidade especialidade="Pediatria" />
              <ItemGridEspecialidade especialidade="Oftalmologia" />
              <ItemGridEspecialidade especialidade="Nutrição" />
              <ItemGridEspecialidade especialidade="Dermatologia" />
              <ItemGridEspecialidade especialidade="Endocrinologia" />
            </div>
          </GridEspecialidades>
        </>
      )}
      <GridClinicas camposFiltrados={objCamposFiltrados} />
    </div>
  );
}
