import { login } from "@/firebase/funcoes";
import { Usuario } from "@/models/Usuario";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import loadingSpinner from "../../assets/loading-spinner.gif";
import Logo from "@/components/Logo/Logo";
import Head from "next/head";

export default function Entrar() {
  const [usuario, setUsuario] = useState<Usuario>({
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);
  const [msgErro, setMsgErro] = useState("");
  async function autenticarUsuario(e: any) {
    e.preventDefault();
    if (usuario.email.length != 0 && usuario.senha.length != 0) {
      const req = await login(
        usuario.email.trim().toLocaleLowerCase(),
        usuario.senha.trim().toLocaleLowerCase()
      );
      if (req == "OK") {
        setLoading(true);
        location.href = "/home";
      } else if (req?.includes("auth/invalid-login-credentials")) {
        setMsgErro("Email ou senha inválido(a)");
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
        <title>Healu - Entrar</title>
      </Head>
      <div className="flex flex-col items-center">
        <Image src={loadingSpinner} alt="" />
      </div>
    </>
  ) : (
    <>
      <Head>
        <title>Healu - Entrar</title>
      </Head>
      <div>
        <Logo className="sm:pl-[1rem] sm:pt-[1rem] sm:flex sm:items-center" />
        <h1 className="text-center text-4xl pt-[4rem]">Entrar</h1>
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
            onSubmit={autenticarUsuario}
          >
            <div>
              <label className="flex pb-2">E-mail</label>
              <input
                className="
              outline-none 
              bg-[#CED2E4] text-[#222] 
              p-2 rounded-lg
              min-w-[20rem]
              "
                type="email"
                placeholder="Digite seu e-mail..."
                required
                value={usuario.email}
                onChange={(e) =>
                  setUsuario({ ...usuario, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="flex pb-2">Senha</label>
              <input
                className="
              outline-none 
              bg-[#CED2E4] text-[#222] 
              p-2 rounded-lg
              min-w-[20rem]
              "
                type="password"
                placeholder="Digite sua senha..."
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
              value="Entrar"
            />
          </form>
          <p className="text-center pt-[.5rem]">
            Não possui uma conta?{" "}
            <Link
              className="
              text-[#2642D9]
              hover:text-[#2926d9]
              "
              href={"/"}
            >
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
