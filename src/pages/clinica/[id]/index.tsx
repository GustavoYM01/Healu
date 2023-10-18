import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingSpiner from "../../../assets/loading-spinner.gif";
import Image from "next/image";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { firebase } from "@/firebase/config";
import { verificarIdQuery } from "@/functions/verificarIdQuery";
import MenuLateral from "@/components/menuLateral/MenuLateral";
import Loading from "../../../assets/loading-spinner.gif";
import Notificacoes from "@/components/Notificacoes/Notificacoes";
import Usuario from "@/components/Usuario/Usuario";
import FiltroPesquisarClinicas from "@/components/FiltroPesquisarClinicas/FiltroPesquisarClinicas";

export default function Clinica() {
  const [loading, setLoading] = useState(false);
  const [infos, setInfos] = useState<any>({});

  const router = useRouter();
  const { id } = router.query;

  async function obterDadosClinica(id: any) {
    try {
      await getDoc(doc(firebase.db, "clinica", id))
        .then((x) => {
          if (x.exists()) setInfos(x.data());
        })
        .catch((e) => console.log(e));
      return false;
    } catch (error) {
      console.log(error);
    }
  }

  // function primeiraLetraMaiuscula(palavra: string) {
  //   return palavra.charAt(0).toUpperCase() + palavra.slice(1);
  // }

  function renderizarInfosClinica() {
    return (
      <div className="flex flex-col">
        <span className="font-semibold text-2xl">{infos["nomeClinica"]}</span>
        <span>{`${infos["cidade"]} - ${infos["estado"]}`}</span>
      </div>
    );
  }

  useEffect(() => {
    if (verificarIdQuery(id)) {
      obterDadosClinica(id);
      setLoading(false);
    }
  }, [id]);

  return loading ? (
    <div className="flex flex-col items-center">
      <Image src={LoadingSpiner} alt="" />
    </div>
  ) : (
    <>
      <MenuLateral />
      <div
        className="
        w-[calc(100%-262px)] left-[240px]
        fixed top-[1rem]
      "
      >
        <div className="flex items-center justify-end gap-[1rem]">
          <Notificacoes />
          <Usuario />
        </div>
      </div>
      <div className="absolute top-[6rem] left-[250px]">
        <div className="flex items-center gap-[1rem]">
          <div className="bg-zinc-500 w-[7rem] h-[7rem] rounded-full"></div>
          {Object.values(infos).length > 0 ? (
            renderizarInfosClinica()
          ) : (
            <div>
              <Image src={Loading} width={90} alt="" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
