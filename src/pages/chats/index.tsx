import React, { useEffect, useState } from "react";
import Loading from "../../assets/loading-spinner.gif";
import Image from "next/image";
import MenuLateral from "@/components/MenuLateral/MenuLateral";
import ClinicasChat from "@/components/ClinicasChat/ClinicasChat";
import { collection, getDocs } from "firebase/firestore";
import { firebase } from "@/firebase/config";

export default function Chats() {
  const [carregando, setCarregando] = useState(true);
  const [nomesClinicas, setNomesClinicas] = useState<string[]>([]);

  const primeiraLetraMaiuscula = (termo: string) => {
    return termo.charAt(0).toUpperCase() + termo.substring(1);
  };

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
    <div className="flex flex-col items-center">
      <Image src={Loading} alt="" />
    </div>
  ) : (
    <div>
      <MenuLateral />
      <ClinicasChat
        className="absolute top-[1rem] left-[230px]"
        arrClinicas={nomesClinicas}
      />
      {/* DIVISOR */}
      <div className="
      absolute top-0 left-[400px] 
      h-[100vh] w-1 bg-[#EFF2FC]
      "></div>
    </div>
  );
}
