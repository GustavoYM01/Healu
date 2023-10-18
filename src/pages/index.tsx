import { cadastrarUsuario } from "../firebase/funcoes";
import { useState } from "react";
import { Usuario } from "@/models/Usuario";
import Image from "next/image";
import loadingSpinner from "../assets/loading-spinner.gif";
import Link from "next/link";

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
    <div className="flex flex-col items-center">
      <Image src={loadingSpinner} alt="" />
    </div>
  ) : (
    <div>
      <h1 className="text-center text-4xl pt-[2rem]">CADASTRE-SE</h1>
      <div className="mt-[2rem]">
        <form
          className="
          flex flex-col items-center 
          gap-[1rem]
          "
          onSubmit={criarSalvarUsuario}
        >
          <div>
            <label className="flex pb-2">Email</label>
            <input
              className="
              outline-none 
              bg-slate-500 text-white 
              p-2 rounded-lg
              "
              type="email"
              placeholder="Informe seu e-mail"
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
              bg-slate-500 text-white 
              p-2 rounded-lg
              "
              type="password"
              placeholder="Informe uma senha"
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
            className="bg-slate-800 text-white p-2 rounded-md cursor-pointer"
            type="submit"
            value="Cadastrar"
          />
          <span>
            Já possui conta?{" "}
            <Link
              className="
          text-[#44cb4f]
          hover:border-b-2
          "
              href={"/entrar"}
            >
              Entre
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
