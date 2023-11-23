import { cadastrarUsuario } from "../firebase/funcoes";
import { useState } from "react";
import { Usuario } from "@/models/Usuario";
import Image from "next/image";
import loadingSpinner from "../assets/loading-spinner.gif";
import Link from "next/link";
import Logo from "@/components/Logo/Logo";
import Head from "next/head";

export default function Home() {
  const [usuario, setUsuario] = useState<Usuario>({
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  async function criarSalvarUsuario(e: any) {
    e.preventDefault();
    if (usuario.email.length != 0 && usuario.senha.length != 0) {
      const req = await cadastrarUsuario(
        usuario.email.trim().toLocaleLowerCase(),
        usuario.senha.trim().toLocaleLowerCase()
      );
      if (req == "OK") {
        setLoading(true);
        location.href = "/home";
      } else if (
        req
          ?.toLocaleLowerCase()
          .includes("password should be at least 6 characters")
      ) {
        setMsgErro("Senha precisa ter no mínimo 6 caracteres");
        setTimeout(() => {
          setMsgErro("");
        }, 3500);
      } else {
        setMsgErro("Por favor, tente novamente mais tarde");
        setTimeout(() => {
          setMsgErro("");
        }, 3500);
      }
    }
  }
  return loading ? (
    <>
      <Head>
        <title>Healu - Cadastre-se</title>
      </Head>
      <div className="flex flex-col items-center">
        <Image src={loadingSpinner} alt="" />
      </div>
    </>
  ) : (
    <>
      <Head>
        <title>Healu - Cadastre-se</title>
      </Head>
      <div>
        <Logo className="sm:pl-[1rem] sm:pt-[1rem] sm:flex sm:items-center" />
        <h1 className="text-center text-4xl pt-[4rem]">Cadastre-se</h1>
        <div className="mt-[.5rem]">
          <form
            className="
          max-w-fit mx-auto
          px-[1rem] py-[1rem]
          rounded-lg
          flex flex-col items-center 
          gap-[1rem]
          bg-[#EFF2FC]
          "
            onSubmit={criarSalvarUsuario}
          >
            <div>
              <label className="flex pb-2">Informe seu e-mail</label>
              <input
                className="
              outline-none 
              bg-[#CED2E4] text-[#222] 
              p-2 rounded-lg
              min-w-[20rem]
              "
                type="email"
                placeholder="Digite um e-mail..."
                required
                value={usuario.email}
                onChange={(e) =>
                  setUsuario({ ...usuario, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="flex pb-2">Crie uma senha</label>
              <input
                className="
              outline-none 
              bg-[#CED2E4] text-[#222] 
              p-2 rounded-lg
              min-w-[20rem]
              "
                type="password"
                placeholder="Digite uma senha..."
                required
                value={usuario.senha}
                onChange={(e) =>
                  setUsuario({ ...usuario, senha: e.target.value })
                }
              />
            </div>
            {msgErro && (
              <span
                className="
          text-[firebrick] text-center max-w-[200px]
          "
              >
                {msgErro}
              </span>
            )}
            <input
              className="
            w-full
            bg-[#2642D9] text-white p-2 rounded-md cursor-pointer
            transition-all ease-in-out
            hover:bg-[#2926d9]
            "
              type="submit"
              value="Cadastrar"
            />
          </form>
          <p className="text-center pt-[.5rem]">
            Já possui conta?{" "}
            <Link
              className="
            text-[#2642D9]
            hover:text-[#2926d9]
          "
              href={"/entrar"}
            >
              Entre
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
