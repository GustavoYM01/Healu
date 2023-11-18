import React, { useContext, useEffect, useState } from "react";
import Loading from "../../assets/loading-spinner.gif";
import Image from "next/image";
import MenuLateral from "@/components/MenuLateral/MenuLateral";
import ClinicasChat from "@/components/ClinicasChat/ClinicasChat";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firebase } from "@/firebase/config";
import { primeiraLetraMaiuscula } from "@/functions/primeiraLetraMaiuscula";
import Head from "next/head";
import UserCtx from "@/contexts/UserContext";
import PacientesChat from "@/components/PacientesChat/PacientesChat";

export default function Chats() {
  const [carregando, setCarregando] = useState(true);
  const [nomesClinicas, setNomesClinicas] = useState<string[]>([]);
  const [pacientes, setPacientes] = useState<
    Array<{ paciente: string; id: string }>
  >([]);
  const [tipoConta, setTipoConta] = useState("");
  const { usuario } = useContext(UserCtx);

  const obterClinicas = async () => {
    await getDocs(collection(firebase.db, "clinica"))
      .then((x) => {
        if (x.size > 0) {
          let arrNomes: string[] = [];
          x.forEach((clinica) =>
            arrNomes.push(primeiraLetraMaiuscula(clinica.data().id))
          );
          setNomesClinicas(arrNomes);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const obterPacientes = async () => {
    await getDocs(
      query(
        collection(firebase.db, "usuarios"),
        where("tipoConta", "in", ["usuário comum"])
      )
    ).then((x) => {
      if (x.size > 0) {
        const arrPacientes: Array<{ paciente: string; id: string }> = [];
        x.forEach((paciente) => {
          arrPacientes.push({
            paciente: paciente.data().usuario,
            id: paciente.data().id,
          });
        });
        setPacientes(arrPacientes);
      }
    });
  };

  const obterTipoUsuario = async (uid: string) => {
    await getDoc(doc(firebase.db, "usuarios", uid)).then((x) => {
      if (x.exists()) {
        setTipoConta(x.data().tipoConta as string);
      }
    });
  };

  useEffect(() => {
    if (usuario != null) {
      obterTipoUsuario(usuario.uid);
      obterPacientes();
      obterClinicas();
      setCarregando(false);
    }
  }, [usuario]);

  return carregando ? (
    <>
      <Head>
        <title>Chats</title>
      </Head>
      <div className="flex flex-col items-center">
        <Image src={Loading} alt="" />
      </div>
    </>
  ) : (
    <>
      <Head>
        <title>Chats</title>
      </Head>
      <div>
        <MenuLateral />
        {tipoConta.toLowerCase().includes("comum") ? (
          <ClinicasChat
            className="absolute top-[1rem] left-[230px]"
            arrClinicas={nomesClinicas}
          />
        ) : (
          <PacientesChat
            className="absolute top-[1rem] left-[230px]"
            arrPacientes={pacientes}
          />
        )}
      </div>
    </>
  );
}
