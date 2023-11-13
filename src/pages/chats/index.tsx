import React, { useEffect, useState } from "react";
import Loading from "../../assets/loading-spinner.gif";
import Image from "next/image";
import MenuLateral from "@/components/MenuLateral/MenuLateral";
import ClinicasChat from "@/components/ClinicasChat/ClinicasChat";
import { collection, getDocs } from "firebase/firestore";
import { firebase } from "@/firebase/config";
import { primeiraLetraMaiuscula } from "@/functions/primeiraLetraMaiuscula";
import Head from "next/head";

export default function Chats() {
  const [carregando, setCarregando] = useState(true);
  const [nomesClinicas, setNomesClinicas] = useState<string[]>([]);

  const obterClinicas = async () => {
    await getDocs(collection(firebase.db, "clinica")).then((x) => {
      if (x.size > 0) {
        let arrNomes: string[] = [];
        x.forEach((clinica) =>
          arrNomes.push(primeiraLetraMaiuscula(clinica.data().id))
        );
        setNomesClinicas(arrNomes);
      }
    });
  };

  useEffect(() => {
    setCarregando(false);
    obterClinicas();
  }, []);

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
        <ClinicasChat
          className="absolute top-[1rem] left-[230px]"
          arrClinicas={nomesClinicas}
        />
      </div>
    </>
  );
}
