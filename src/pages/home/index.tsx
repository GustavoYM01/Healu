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
import MenuLateralMobile from "@/components/MenuLateralMobile/MenuLateralMobile";
import Logo from "@/components/Logo/Logo";
import Notificacoes from "@/components/Notificacoes/Notificacoes";
import Usuario from "@/components/Usuario/Usuario";

export default function Principal() {
  const [carregando, setCarregando] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [mostrarBtnLimparFiltros, setMostrarLimparFiltros] = useState(false);
  const [objCamposFiltrados, setObjCamposFiltrados] = useState(
    {} as CamposFiltros
  );

  useEffect(() => {
    setMobile(window.innerWidth < 600);
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
        {mobile ? <MenuLateralMobile /> : <MenuLateral />}
        {mobile && (
          <div className="flex items-center justify-between mt-[.5rem]">
            <Logo className="flex items-center p-0 ml-[.5rem]" />
            <div className="flex items-center gap-2 mr-[.5rem]">
              <Notificacoes />
              <Usuario />
            </div>
          </div>
        )}
        {mobile ? (
          <FiltroPesquisarClinicas
            className="w-full"
            funcaoCallBack={setObjCamposFiltrados}
            limpar={mostrarBtnLimparFiltros}
            alterarLimpar={setMostrarLimparFiltros}
          />
        ) : (
          <FiltroPesquisarClinicas
            funcaoCallBack={setObjCamposFiltrados}
            limpar={mostrarBtnLimparFiltros}
            alterarLimpar={setMostrarLimparFiltros}
          />
        )}
        {!(
          Object.values(objCamposFiltrados).length > 0 &&
          Object.values(objCamposFiltrados).some((x) => x.trim() !== "")
        ) && (
          <>
            <CarouselClinicas />
            <GridEspecialidades>
              <div
                className={`${
                  mobile
                    ? `flex items-center justify-center flex-wrap gap-[1rem]`
                    : `max-w-[63rem] flex flex-wrap items-center gap-[1rem]`
                }`}
              >
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
