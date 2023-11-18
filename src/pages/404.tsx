import Head from "next/head";
import Image from "next/image";
import React from "react";
import PaginaNaoEncontrada from "../assets/page_not_found_healu.svg";

export default function NaoEncontrado() {
  return (
    <>
      <Head>
        <title>Não encontrado</title>
      </Head>
      <div className="flex flex-col items-center pt-[2rem]">
        <Image src={PaginaNaoEncontrada} width={200} alt="" />
        <h1 className="text-[#AFAFAF] text-6xl">404</h1>
        <p className="text-[#AFAFAF] text-3xl">Página não encontrada</p>
      </div>
    </>
  );
}
