import { useEffect, useState } from "react";
import MostradorEstrelas from "../MostradorEstrelas/MostradorEstrelas";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firebase } from "@/firebase/config";
import { useRouter } from "next/router";
import Loading from "../../assets/loading-spinner.gif";
import Image from "next/image";
import { verificarIdQuery } from "@/functions/verificarIdQuery";

interface CardAvaliacoesDetalhadasProps {
  avaliacaoMedia: number;
}

export default function CardAvaliacoesDetalhadas({
  avaliacaoMedia,
}: CardAvaliacoesDetalhadasProps) {
  const [qtdAvaliacoes, setQtdAvaliacoes] = useState(0);
  const [infosClinica, setInfosClinica] = useState<any>([]);
  const [carregando, setCarregando] = useState(true);
  const [notasCont, setNotasCont] = useState<any>({});
  const [avaliacoes, setAvaliacoes] = useState<any>([]);
  const { id } = useRouter().query;

  const obterInfosClincaEQtdAvaliacoes = async () => {
    try {
      await getDocs(
        query(collection(firebase.db, "clinica"), where("id", "==", id))
      ).then((x) => {
        if (x.size > 0) {
          let infosArr: any[] = [];
          x.forEach((v) => infosArr.push(v.data()));
          infosArr.map((x, i) => {
            if (x.hasOwnProperty("avaliacoes"))
              setQtdAvaliacoes(Object.keys(x.avaliacoes).length);
            else setQtdAvaliacoes(0);
          });
          setInfosClinica(infosArr);
          return;
        }
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };
  const obterAvaliacoes = async (idClinica: any) => {
    await getDocs(
      query(collection(firebase.db, "avaliacoes"), where("id", "==", idClinica))
    ).then((x) => {
      if (x.size > 0) {
        let infosArr: any[] = [];
        x.forEach((v) => {
          infosArr.push(v.data());
        });
        const novosDados: any = [];
        infosArr.forEach((x) => {
          const dadosAvaliacao: any = {};
          for (const propriedade in x) {
            if (
              x.hasOwnProperty(propriedade) &&
              propriedade.startsWith("infosAvaliacao")
            ) {
              dadosAvaliacao[propriedade] = x[propriedade];
            }
          }
          novosDados.push({
            avaliacoes: dadosAvaliacao,
          });
        });
        if (Array.from(novosDados).length > 0) {
          setAvaliacoes(novosDados);
        }
        const notasCount: any = {};
        Array.from(avaliacoes).map((avaliacao: any, index: any) => {
          if (avaliacao && typeof avaliacao === "object") {
            const infosAvaliacaoKeys = Object.keys(avaliacao.avaliacoes).filter(
              (key) => key.startsWith("infosAvaliacao")
            );
            infosAvaliacaoKeys.forEach((key) => {
              const info = avaliacao.avaliacoes[key];
              const nota = Math.round(info.nota);
              notasCount[nota] = (notasCount[nota] || 0) + 1;
            });
          }
        });
        setNotasCont(notasCount);
      }
      return;
    });
    return;
  };
  const renderizarBarrasAvaliacao = () => {
    return Array.from(
      { length: 6 },
      (_, index) =>
        index !== 0 && (
          <div className="flex items-center gap-2" key={index}>
            <p>{6 - index}</p>
            {String(6 - index) === String(Math.ceil(avaliacaoMedia)) &&
            Number(String(avaliacaoMedia).split(".")[1]) < 5 ? (
              <div className="flex w-[50rem] h-2">
                <div className="w-[30%] h-full bg-[#2642D9] rounded-l-md"></div>
                <div className="w-[70%] h-full bg-[#CED2E4] rounded-r-md"></div>
              </div>
            ) : String(6 - index) === String(Math.ceil(avaliacaoMedia)) &&
              Number(String(avaliacaoMedia).split(".")[1]) >= 7 ? (
              <div className="flex w-[50rem] h-2">
                <div className="w-[80%] h-full bg-[#2642D9] rounded-l-md"></div>
                <div className="w-[20%] h-full bg-[#CED2E4] rounded-r-md"></div>
              </div>
            ) : String(6 - index) === String(Math.ceil(avaliacaoMedia)) &&
              Number(String(avaliacaoMedia).split(".")[1]) < 7 ? (
              <div className="flex w-[50rem] h-2">
                <div className="w-1/2 h-full bg-[#2642D9] rounded-l-md"></div>
                <div className="w-1/2 h-full bg-[#CED2E4] rounded-r-md"></div>
              </div>
            ) : String(6 - index) === String(avaliacaoMedia).split(".")[0] ? (
              <div className="w-[50rem] h-2 rounded-md bg-[#2642D9]"></div>
            ) : (
              <div className="w-[50rem] h-2 rounded-md bg-[#CED2E4]"></div>
            )}
            {String(6 - index) === String(Math.ceil(avaliacaoMedia)) &&
            notasCont &&
            notasCont[String(6 - index)] ? (
              <p className="">{`${notasCont[String(6 - index)]}`}</p>
            ) : (
              <p>0</p>
            )}
          </div>
        )
    );
  };

  useEffect(() => {
    if (verificarIdQuery(id)) {
      obterInfosClincaEQtdAvaliacoes();
      obterAvaliacoes(id);
      if (Array.from(avaliacoes).length > 0) setCarregando(false);
      setCarregando(false);
    }
  }, [id, avaliacoes]);

  return carregando ? (
    <div className="flex justify-center">
      <Image src={Loading} alt="" />
    </div>
  ) : (
    <div
      className="
      bg-[#EFF2FC]
      p-[2rem] mr-[4rem] 
      rounded-lg
      max-w-fit
      "
    >
      <div className="flex items-center gap-[5rem]">
        <div className="flex flex-col items-center">
          <span className="text-4xl pb-[.5rem]">
            {avaliacaoMedia && avaliacaoMedia.toFixed(1)}
          </span>
          <MostradorEstrelas mediaAvaliacao={Math.floor(avaliacaoMedia)} qtdEstrelas={5} />
          <div className="pt-[1rem]">
            {qtdAvaliacoes !== 0 && qtdAvaliacoes < 2 ? (
              <div className="text-sm">{qtdAvaliacoes} Avaliação</div>
            ) : qtdAvaliacoes > 1 ? (
              <div className="text-sm">{qtdAvaliacoes} Avaliações</div>
            ) : qtdAvaliacoes < 1 ? (
              <div className="text-sm">{0} Avaliações</div>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-[1rem]">
          <div className="flex flex-col items-center">
            {renderizarBarrasAvaliacao()}
          </div>
        </div>
      </div>
    </div>
  );
}
