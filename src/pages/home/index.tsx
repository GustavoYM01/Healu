import { useEffect, useState } from "react";
import Loading from "../../assets/loading-spinner.gif";
import Image from "next/image";
import { verificarAutenticado } from "@/functions/verificarUsuarioAutenticado";
import MenuLateral from "@/components/MenuLateral/MenuLateral";
import FiltroPesquisarClinicas from "@/components/FiltroPesquisarClinicas/FiltroPesquisarClinicas";
import CarouselClinicas from "@/components/CarouselClinicas/CarouselClinicas";
import GridEspecialidades from "@/components/GridEspecialidades/GridEspecialidades";
import ItemGridEspecialidade from "@/components/ItemGridEspecialidade/ItemGridEspecialidade";
import GridClinicas from "@/components/GridClinicas/GridClinicas";
import { CamposFiltros } from "@/models/CamposFiltro";
import Head from "next/head";

export default function Principal() {
  const [carregando, setCarregando] = useState(true);
  const [mostrarBtnLimparFiltros, setMostrarLimparFiltros] = useState(false);
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
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col items-center">
        <Image src={Loading} alt="" />
      </div>
    </>
  ) : (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <MenuLateral />
        <FiltroPesquisarClinicas
          funcaoCallBack={setObjCamposFiltrados}
          limpar={mostrarBtnLimparFiltros}
          alterarLimpar={setMostrarLimparFiltros}
        />
        {!(
          Object.values(objCamposFiltrados).length > 0 &&
          Object.values(objCamposFiltrados).some((x) => x.trim() !== "")
        ) && (
          <>
            <CarouselClinicas />
            <GridEspecialidades>
              <div className="max-w-[63rem] flex flex-wrap items-center gap-[1rem]">
                <ItemGridEspecialidade
                  funcaoDefinirEspecialidade={setObjCamposFiltrados}
                  mostrarBtnLimparFiltros={setMostrarLimparFiltros}
                  especialidade="Clínico Geral"
                />
                <ItemGridEspecialidade
                  funcaoDefinirEspecialidade={setObjCamposFiltrados}
                  mostrarBtnLimparFiltros={setMostrarLimparFiltros}
                  especialidade="Ginecologia"
                />
                <ItemGridEspecialidade
                  funcaoDefinirEspecialidade={setObjCamposFiltrados}
                  mostrarBtnLimparFiltros={setMostrarLimparFiltros}
                  especialidade="Ortopedia"
                />
                <ItemGridEspecialidade
                  funcaoDefinirEspecialidade={setObjCamposFiltrados}
                  mostrarBtnLimparFiltros={setMostrarLimparFiltros}
                  especialidade="Pediatria"
                />
                <ItemGridEspecialidade
                  funcaoDefinirEspecialidade={setObjCamposFiltrados}
                  mostrarBtnLimparFiltros={setMostrarLimparFiltros}
                  especialidade="Oftalmologia"
                />
                <ItemGridEspecialidade
                  funcaoDefinirEspecialidade={setObjCamposFiltrados}
                  mostrarBtnLimparFiltros={setMostrarLimparFiltros}
                  especialidade="Nutrição"
                />
                <ItemGridEspecialidade
                  funcaoDefinirEspecialidade={setObjCamposFiltrados}
                  mostrarBtnLimparFiltros={setMostrarLimparFiltros}
                  especialidade="Dermatologia"
                />
                <ItemGridEspecialidade
                  funcaoDefinirEspecialidade={setObjCamposFiltrados}
                  mostrarBtnLimparFiltros={setMostrarLimparFiltros}
                  especialidade="Endocrinologia"
                />
              </div>
            </GridEspecialidades>
          </>
        )}
        <GridClinicas camposFiltrados={objCamposFiltrados} />
      </div>
    </>
  );
}
