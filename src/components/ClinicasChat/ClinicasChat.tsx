import { FormEvent, useContext, useEffect, useState } from "react";
import Nutrife from "../../assets/clinica-nutrife.jpg";
import Pedivida from "../../assets/clinica-pedivida.jpg";
import Ortomove from "../../assets/clinica-ortomove.jpg";
import Gynelogic from "../../assets/clinica-gynelogic.jpg";
import DeMelo from "../../assets/clinica-demelo.jpg";
import CardioExcel from "../../assets/clinica-cardioexcel.jpg";
import Dermello from "../../assets/dermelo2.jpg";
import Loading from "../../assets/loading-spinner.gif";
import Image from "next/image";
import { primeiraLetraMaiuscula } from "@/functions/primeiraLetraMaiuscula";
import UserCtx from "@/contexts/UserContext";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firebase } from "@/firebase/config";
import { verificarContextoUsuario } from "@/functions/verificarContextoUsuario";
import { Mensagem } from "@/models/Mensagem";
import { agruparMensagensPorData } from "@/functions/agruparMensagensPorData";
import { novoValorKeyProp } from "@/functions/novoValorKeyProp";
import { formatarData } from "@/functions/formatarData";

interface ClinicasChatProps {
  className?: string;
  arrClinicas: string[];
}

export default function ClinicasChat({
  className,
  arrClinicas,
}: ClinicasChatProps) {
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [destinatario, setDest] = useState("");
  const [msg, setMsg] = useState("");
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const { usuario } = useContext(UserCtx);

  const enviarMsg = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (verificarContextoUsuario(usuario)) {
        await addDoc(
          collection(
            firebase.db,
            "mensagens",
            usuario.uid > destinatario
              ? usuario.uid + destinatario
              : destinatario + usuario.uid,
            "chat"
          ),
          {
            texto: msg,
            de: usuario.uid,
            para: destinatario,
            data: Timestamp.fromDate(new Date()),
          }
        ).then(() => setMsg(""));
      } else
        alert("Problema no contexto do usuário, por favor tente mais tarde.");
    } catch (error) {
      console.log(error);
    }
  };

  const renderizarMsgs = () => {
    if (mensagens.length > 0) {
      return Object.entries(agruparMensagensPorData(mensagens)).map(
        ([data]) => {
          return (
            <>
              <div
                key={novoValorKeyProp(data)}
                className="
              max-w-fit mx-auto px-2
              bg-[#EFF2FC] rounded-md
              "
              >
                {data}
              </div>
              {mensagens.map((mensagem) => {
                if (formatarData(mensagem.data.toDate()) === data) {
                  return (
                    <div
                      key={novoValorKeyProp(mensagem.id)}
                      className={`
                  mr-[.5rem]
                  rounded-lg w-fit max-w-[25rem]
                  ${
                    mensagem.de !== destinatario
                      ? "bg-[#2642D9] text-white ml-auto"
                      : "bg-[#EFF2FC] text-black"
                  } py-1 px-2 mt-2
                  `}
                    >
                      <li>{mensagem.texto}</li>
                      <span className="block text-right text-sm pt-2">
                        {mensagem.data.toDate().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  );
                }
              })}
            </>
          );
        }
      );
    }
  };

  useEffect(() => {
    try {
      if (destinatario !== "" && verificarContextoUsuario(usuario)) {
        const unsub = onSnapshot(
          query(
            collection(
              firebase.db,
              "mensagens",
              usuario.uid > destinatario
                ? usuario.uid + destinatario
                : destinatario + usuario.uid,
              "chat"
            ),
            orderBy("data", "asc")
          ),
          (querySnapshot) => {
            let msgs: any = [];
            querySnapshot.forEach((doc) => {
              msgs.push({ ...doc.data(), id: doc.id });
            });
            setMensagens(msgs);
          }
        );
        return () => unsub();
      }
    } catch (error) {
      console.log(error);
    }
  }, [destinatario, usuario]);

  return (
    <div className={`${className} cursor-pointer`}>
      {!(arrClinicas.length > 0) ? (
        <div className="flex flex-col items-center">
          <Image className="max-w-[10rem]" src={Loading} alt="" />
        </div>
      ) : (
        arrClinicas.map((x, i) => (
          <div
            key={i}
            onClick={() => {
              setSelecionado(i);
              setDest(x.toLowerCase());
            }}
            className={`
          flex items-center gap-[.5rem] 
          mb-[.5rem] py-2 px-[.5rem]
          rounded-lg
          transition-all ease-in-out
          ${selecionado === i && "bg-[#EFF2FC]"}
          `}
          >
            <div>
              <Image
                className="w-[2.5rem] h-[2.5rem] rounded-full"
                src={
                  x.toLowerCase().includes("nutrife")
                    ? Nutrife
                    : x.toLowerCase().includes("pedivida")
                    ? Pedivida
                    : x.toLowerCase().includes("ortomove")
                    ? Ortomove
                    : x.toLowerCase().includes("gynelogic")
                    ? Gynelogic
                    : x.toLowerCase().includes("demelo")
                    ? DeMelo
                    : x.toLowerCase().includes("cardioexcel")
                    ? CardioExcel
                    : x.toLowerCase().includes("dermello")
                    ? Dermello
                    : ""
                }
                alt=""
              />
            </div>
            <p>{x}</p>
          </div>
        ))
      )}
      {/* DIVISOR */}
      <div
        className="
      absolute top-[-1rem] left-[180px] 
      h-[100vh] w-1 bg-[#EFF2FC]
      "
      ></div>
      <div
        className="
      w-[calc(100%-500px)]
      fixed top-[1rem] left-[440px]
      "
      >
        {destinatario !== "" && (
          <div className="flex items-center gap-[1rem]">
            <Image
              className="w-[3rem] h-[3rem] rounded-full"
              src={
                destinatario.toLowerCase().includes("nutrife")
                  ? Nutrife
                  : destinatario.toLowerCase().includes("pedivida")
                  ? Pedivida
                  : destinatario.toLowerCase().includes("ortomove")
                  ? Ortomove
                  : destinatario.toLowerCase().includes("gynelogic")
                  ? Gynelogic
                  : destinatario.toLowerCase().includes("demelo")
                  ? DeMelo
                  : destinatario.toLowerCase().includes("cardioexcel")
                  ? CardioExcel
                  : destinatario.toLowerCase().includes("dermello")
                  ? Dermello
                  : ""
              }
              alt=""
            />
            <span>{primeiraLetraMaiuscula(destinatario)}</span>
          </div>
        )}
        {destinatario !== "" && (
          <>
            <div
              className="
              h-[80vh]
              overflow-y-auto
              "
            >
              <ul>{renderizarMsgs()}</ul>
            </div>
            <form className="mt-[.5rem]" onSubmit={enviarMsg}>
              <input
                className="
                w-[100%]
                outline-none p-2 bg-[#EFF2FC]
                rounded-lg
                "
                type="text"
                placeholder="Digite uma mensagem"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
              />
              <input type="submit" value="" />
            </form>
          </>
        )}
      </div>
    </div>
  );
}
