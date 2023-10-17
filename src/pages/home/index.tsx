import PesquisarUsuarios from "@/components/pesquisarUsuarios";
import UserCtx from "@/contexts/UserContext";
import { sair } from "@/firebase/funcoes";
import { useContext, useEffect, useState } from "react";
import Loading from "../../assets/loading-spinner.gif";
import Image from "next/image";
import { verificarAutenticado } from "@/functions/verificarUsuarioAutenticado";
import MenuLateral from "@/components/menuLateral/MenuLateral";
import FiltroPesquisarClinicas from "@/components/FiltroPesquisarClinicas/FiltroPesquisarClinicas";
import Notificacoes from "@/components/Notificacoes/Notificacoes";
import Usuario from "@/components/Usuario/Usuario";
import CarouselClinicas from "@/components/CarouselClinicas/CarouselClinicas";
import GridEspecialidades from "@/components/GridEspecialidades/GridEspecialidades";
import ItemGridEspecialidade from "@/components/ItemGridEspecialidade/ItemGridEspecialidade";
import GridClinicas from "@/components/GridClinicas/GridClinicas";

export default function Principal() {
  const [carregando, setCarregando] = useState(true);

  const { usuario } = useContext(UserCtx);
  async function logout() {
    await sair().then(() => (location.href = "/"));
  }

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
    <div
      className="
      relative
      overflow-x-hidden
      "
    >
      <MenuLateral />
      <FiltroPesquisarClinicas />
      <CarouselClinicas />
      <GridEspecialidades>
        <div className="max-w-[63rem] flex flex-wrap items-center gap-[1rem]">
          <ItemGridEspecialidade especialidade="Clínico Geral" />
          <ItemGridEspecialidade especialidade="Ginecologia" />
          <ItemGridEspecialidade especialidade="Ortopedia" />
          <ItemGridEspecialidade especialidade="Pediatria" />
          <ItemGridEspecialidade especialidade="Clínico Geral" />
          <ItemGridEspecialidade especialidade="Ginecologia" />
          <ItemGridEspecialidade especialidade="Ortopedia" />
          <ItemGridEspecialidade especialidade="Pediatria" />
        </div>
      </GridEspecialidades>
      <GridClinicas />
      {/* <h1 className="text-4xl">Página Principal</h1>
      <div className="mt-[2rem]">
        👋 Bem-vindo{"(a)"} {usuario ? usuario.email.split("@")[0] : ""}
      </div>
      <button
        onClick={logout}
        className="
    mt-[2rem] ml-[1rem] 
    py-2 px-3
    bg-blue-600 rounded-lg text-white
    "
      >
        SAIR
      </button>
      <PesquisarUsuarios className="mt-[2rem] ml-[2rem]" /> */}
    </div>
  );
}
