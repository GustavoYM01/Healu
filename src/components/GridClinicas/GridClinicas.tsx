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
  const [nenhumResultado, setNenhumResultado] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [todasClinicas, setTodasClinicas] = useState<any[]>([]);

  async function obterClinicasComFiltro(
    especialidade: string,
    estado: string,
    cidade: string
  ) {
    try {
      setNenhumResultado(false);
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
          console.log(arrResults);
          setResultadosPesquisa(arrResults);
          setCarregando(false);
        } else setNenhumResultado(true);
      });
    } catch (error) {
      console.log(error);
      setCarregando(false);
    }
  }

  async function obterTodasClinicas() {
    try {
      setResultadosPesquisa([]);
      setNenhumResultado(false);
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
        avaliacaoMedia={x.avaliacaoMedia}
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
        avaliacaoMedia={x.avaliacaoMedia}
        especialidade={x.especialidade}
      />
    ));
  }

  useEffect(() => {
    setMobile(window.innerWidth < 600);
    if (Object.values(props.camposFiltrados).some((x) => x.trim() !== "")) {
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
      pb-[10rem]
      ${
        mobile
          ? `w-[95%] mx-auto`
          : "w-[calc(100%-240px)] absolute left-[256px]"
      } 
      ${
        !mobile && Object.values(props.camposFiltrados).length > 0
          ? "top-[6rem]"
          : !mobile
          ? "top-[42rem]"
          : ""
      }
      `}
    >
      <div
        className={`${mobile ? `w-[95%] mx-auto mt-[1rem]` : `
        max-w-[63rem] 
        flex flex-wrap 
        items-center gap-[1rem]
        `}`}
      >
        {carregando ? (
          <div className="mx-auto">
            <Image src={Loading} alt="" />
          </div>
        ) : resultadosPesquisa.length > 0 ? (
          renderizarClinicasFiltradas()
        ) : nenhumResultado ? (
          <div>Nenhum resultado encontrado</div>
        ) : (
          renderizarTodasClinicas()
        )}
      </div>
    </section>
  );
}
