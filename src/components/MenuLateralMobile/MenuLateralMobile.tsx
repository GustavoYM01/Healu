import React from "react";
import ItensMenuLateral from "../ItensMenuLateral/ItensMenuLateral";
import Logout from "../Logout/Logout";
import { alterarHref } from "@/functions/alterarHref";
import { useRouter } from "next/router";

export default function MenuLateralMobile() {
  const router = useRouter();
  return (
    <menu
      className="
      w-full fixed bottom-0
      z-10
      bg-[#EFF2FC]
      "
    >
      <div className="
      my-2
      flex items-center justify-around content-center
      ">
        <ItensMenuLateral
          className="
          flex flex-col items-center justify-center
          px-2 rounded-lg
          "
          tipoItem="home"
          texto="Home"
          fazParteDaRota={router.asPath.includes("home")}
          onClick={() => alterarHref("/home")}
        />
        <ItensMenuLateral
          className="flex flex-col items-center justify-center"
          tipoItem="chat"
          texto="Chat"
          fazParteDaRota={router.asPath.includes("chat")}
          onClick={() => alterarHref("/chats")}
        />
        <ItensMenuLateral
          className="flex flex-col items-center justify-center"
          tipoItem="agenda"
          texto="Agenda"
          fazParteDaRota={router.asPath.includes("agenda")}
          onClick={() => alterarHref("/agenda")}
        />
        <ItensMenuLateral
          className="flex flex-col items-center justify-center"
          tipoItem="arquivos"
          texto="Arquivos"
          fazParteDaRota={router.asPath.includes("arquivos")}
          onClick={() => alterarHref("/arquivos")}
        />
        <Logout className="flex flex-col items-center justify-center" />
      </div>
    </menu>
  );
}
