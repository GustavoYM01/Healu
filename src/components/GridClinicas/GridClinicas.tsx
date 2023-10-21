import { useEffect, useState } from "react";
import ItemGridClinica from "../ItemGridClinica/ItemGridClinica";
import { CamposFiltros } from "@/models/CamposFiltro";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firebase } from "@/firebase/config";
import Loading from "../../assets/loading-spinner.gif";
import Image from "next/image";

interface GridClinicasProps {
  camposFiltrados: CamposFiltros;
}

export default function GridClinicas(props: GridClinicasProps) {
  const [carregando, setCarregando] = useState(true);
  const [resultadosPesquisa, setResultadosPesquisa] = useState<any[]>([]);
  const [todasClinicas, setTodasClinicas] = useState<any[]>([]);

  async function obterClinicasComFiltro(
    especialidade: string,
    estado: string,
    cidade: string
  ) {
    try {
      const clinicCollectionRef = collection(firebase.db, "clinica");
      let queryRef = query(clinicCollectionRef);

      if (especialidade !== "") {
        queryRef = query(queryRef, where("especialidade", "==", especialidade));
      }
      if (estado !== "") {
        queryRef = query(queryRef, where("estado", "==", estado));
      }
      if (cidade !== "") {
        queryRef = query(queryRef, where("cidade", "==", cidade));
      }
      await getDocs(queryRef).then((x) => {
        if (x.size > 0) {
          let arrResults: any[] = [];
          x.forEach((v) => arrResults.push(v.data()));
          setResultadosPesquisa(arrResults);
          setCarregando(false);
        }
      });
    } catch (error) {
      console.log(error);
      setCarregando(false);
    }
  }

  async function obterTodasClinicas() {
    try {
      setResultadosPesquisa([]);
      await getDocs(query(collection(firebase.db, "clinica"))).then((x) => {
        if (x.size > 0) {
          let arrResults: any[] = [];
          x.forEach((v) => arrResults.push(v.data()));
          setTodasClinicas(arrResults);
          setCarregando(false);
        }
      });
    } catch (error) {
      console.log(error);
      setCarregando(false);
    }
  }

  function renderizarClinicasFiltradas() {
    return resultadosPesquisa.map((x, i) => (
      <ItemGridClinica
        key={i}
        nomeClinica={x.nomeClinica.split("-")[0].trim()}
        uf={x.estado}
        especialidade={x.especialidade}
      />
    ));
  }

  function renderizarTodasClinicas() {
    return todasClinicas.map((x, i) => (
      <ItemGridClinica
        key={i}
        nomeClinica={x.nomeClinica.split("-")[0].trim()}
        uf={x.estado}
        especialidade={x.especialidade}
      />
    ));
  }

  useEffect(() => {
    if (
      Object.values(props.camposFiltrados).some((x) => x.trim() !== "")
    ) {
      obterClinicasComFiltro(
        props.camposFiltrados.especialidade,
        props.camposFiltrados.estado,
        props.camposFiltrados.cidade
      );
    } else {
      obterTodasClinicas();
    }
  }, [props.camposFiltrados]);
  return (
    <section
      className={`
      w-[calc(100%-240px)] pb-[10rem]
      absolute ${
        Object.values(props.camposFiltrados).length > 0
          ? "top-[6rem]"
          : "top-[42rem]"
      } left-[256px]
      `}
    >
      <div
        className="
      max-w-[63rem] 
      flex flex-wrap 
      items-center gap-[1rem]
      "
      >
        {carregando ? (
          <div className="mx-auto">
            <Image src={Loading} alt="" />
          </div>
        ) : resultadosPesquisa.length > 0 ? (
          renderizarClinicasFiltradas()
        ) : (
          renderizarTodasClinicas()
        )}
      </div>
    </section>
  );
}
