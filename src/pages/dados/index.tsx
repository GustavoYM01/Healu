import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import loadingSpinner from "../../assets/loading-spinner.gif";
import MenuLateral from "@/components/MenuLateral/MenuLateral";
import UserCtx from "@/contexts/UserContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { firebase } from "@/firebase/config";
import { UsuarioFirebase } from "@/models/InfosUsuarioFirebase";
import Notificacoes from "@/components/Notificacoes/Notificacoes";
import Usuario from "@/components/Usuario/Usuario";

export default function Dados() {
  const [loading, setLoading] = useState(true);
  const [loadingInfos, setLoadingInfos] = useState(false);
  const [infosUser, setInfosUser] = useState<UsuarioFirebase>({
    tipoConta: "",
    usuario: "",
    email: "",
  });
  const { usuario } = useContext(UserCtx);
  const obterInfosUsuario = async (uid: string) => {
    try {
      await getDoc(doc(firebase.db, "usuarios", uid)).then((x) => {
        if (x.exists()) {
          setInfosUser({
            tipoConta: x.data().tipoConta as string,
            usuario: x.data().usuario as string,
            email: x.data().email as string,
          });
        }
      });
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const salvarNovasInfos = async () => {
    try {
      setLoadingInfos(true);
      if (Object.values(infosUser).length > 0) {
        await setDoc(doc(firebase.db, "usuarios", usuario.uid), {
          tipoConta: infosUser.tipoConta,
          usuario: infosUser.usuario,
          email: infosUser.email,
        }).then(() => {
          location.reload();
        });
      }
    } catch (error: any) {
      setLoadingInfos(false);
      console.log(error?.message);
    }
  };

  useEffect(() => {
    if (usuario !== null) {
      obterInfosUsuario(usuario.uid);
      setLoading(false);
    }
  }, [usuario]);

  return loading ? (
    <>
      <Head>
        <title>Dados</title>
      </Head>
      <div className="flex flex-col items-center">
        <Image src={loadingSpinner} alt="" />
      </div>
    </>
  ) : (
    <>
      <Head>
        <title>Dados</title>
      </Head>
      <div>
        <MenuLateral />
        <section
          className="
      w-[calc(100%-290px)]
      absolute top-[1rem] left-[260px]
      "
        >
          <div className="flex items-center justify-end gap-[.5rem]">
            <Notificacoes />
            <Usuario />
          </div>
          {loading ? (
            <div className="flex flex-col items-center">
              <Image src={loadingSpinner} alt="" />
            </div>
          ) : (
            <div
              className="
              flex flex-col -mt-[1.5rem]
              max-w-[14rem]
              "
            >
              <div
                className="
                flex items-center 
                justify-center gap-[.5rem]
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.5 4C23.8978 4 24.2794 4.15804 24.5607 4.43934L27.5607 7.43934C28.1464 8.02513 28.1464 8.97487 27.5607 9.56066L12.1213 25H16.75C17.5784 25 18.25 25.6716 18.25 26.5C18.25 27.3284 17.5784 28 16.75 28H5.5C4.67157 28 4 27.3284 4 26.5V23.5C4 23.1022 4.15804 22.7206 4.43934 22.4393L22.4393 4.43934C22.7206 4.15804 23.1022 4 23.5 4ZM7.87868 25L24.3787 8.5L23.5 7.62132L7 24.1213V25H7.87868ZM22.75 28H21.25C20.4216 28 19.75 27.3284 19.75 26.5C19.75 25.6716 20.4216 25 21.25 25H22.75C23.5784 25 24.25 25.6716 24.25 26.5C24.25 27.3284 23.5784 28 22.75 28Z"
                    fill="black"
                  />
                </svg>
                <h2 className="font-medium text-2xl">Meus Dados</h2>
              </div>
              <label className="pt-[1rem]">Nome de usuário</label>
              <input
                className="
             bg-[#CED2E4]
            text-[#222]
            rounded-md p-2
            outline-none
            "
                type="text"
                value={infosUser.usuario}
                onChange={(e) =>
                  setInfosUser({ ...infosUser, usuario: e.target.value })
                }
              />
              <label className="pt-[1rem]">E-mail</label>
              <input
                className="
             bg-[#CED2E4]
            text-[#222]
            rounded-md p-2
            outline-none
            "
                type="email"
                value={infosUser.email}
                onChange={(e) =>
                  setInfosUser({ ...infosUser, email: e.target.value })
                }
              />
              <label className="pt-[1rem]">Tipo de conta</label>
              <input
                className="
             bg-[#CED2E4]
            text-[#222]
            rounded-md p-2
            outline-none
            "
                type="text"
                value={infosUser.tipoConta}
                disabled
              />
              <button
                className="
             bg-[#2642D9]
            p-2 rounded-lg text-[#fff]
            mt-[1rem]
            transition-all ease-in-out
            hover:bg-[#2926d9]
            "
                onClick={() => salvarNovasInfos()}
              >
                {loadingInfos ? (
                  <div className="flex justify-center">
                    <Image src={loadingSpinner} height={40} alt="" />
                  </div>
                ) : (
                  "Salvar"
                )}
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
