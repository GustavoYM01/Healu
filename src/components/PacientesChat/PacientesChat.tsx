import UserCtx from "@/contexts/UserContext";
import { firebase } from "@/firebase/config";
import { agruparMensagensPorData } from "@/functions/agruparMensagensPorData";
import { formatarData } from "@/functions/formatarData";
import { novoValorKeyProp } from "@/functions/novoValorKeyProp";
import { verificarContextoUsuario } from "@/functions/verificarContextoUsuario";
import { Mensagem } from "@/models/Mensagem";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Image from "next/image";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import Loading from "../../assets/loading-spinner.gif";

interface PacientesChatProps {
  className?: string;
  arrPacientes: Array<{ paciente: string; id: string }>;
}

export default function PacientesChat({
  className,
  arrPacientes,
}: PacientesChatProps) {
  const [selecionado, setSelecionado] = useState<number | null>(null);
  const [nomePaciente, setNomePaciente] = useState("");
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [destinatario, setDest] = useState("");
  const [msg, setMsg] = useState("");
  const { usuario } = useContext(UserCtx);

  const enviarMsg = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (verificarContextoUsuario(usuario)) {
        await addDoc(
          collection(
            firebase.db,
            "mensagens",
            usuario.email.split("@")[0] > destinatario
              ? usuario.email.split("@")[0] + destinatario
              : destinatario + usuario.email.split("@")[0],
            "chat"
          ),
          {
            texto: msg,
            de: usuario.email.split("@")[0],
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
              usuario.email.split("@")[0] > destinatario
                ? usuario.email.split("@")[0] + destinatario
                : destinatario + usuario.email.split("@")[0],
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
      {!(arrPacientes.length > 0) ? (
        <div className="flex flex-col items-center">
          <Image className="max-w-[10rem]" src={Loading} alt="" />
        </div>
      ) : (
        arrPacientes.map((x, i) => (
          <div
            key={i}
            className={`
          flex items-center gap-[.5rem] 
          mb-[.5rem] ml-[.5rem]
          rounded-lg
          transition-all ease-in-out
          `}
            onClick={() => {
              setSelecionado(i);
              setDest(x.id);
              setNomePaciente(x.paciente);
            }}
          >
            <div
              className={`
            transition-all ease-in-out
            ${selecionado === i ? "bg-[#2642D9] text-white" : "bg-[#EFF2FC]"}
            max-w-[10rem]
            w-full
            overflow-x-hidden
            p-4 text-center
            rounded-lg
            `}
            >
              <p className="overflow-x-hidden">{x.paciente}</p>
            </div>
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
            <span>{nomePaciente}</span>
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
