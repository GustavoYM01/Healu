import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { firebase } from "@/firebase/config";
import UserCtx from "@/contexts/UserContext";

export default function Chat() {
  const [novaMensagem, setNovaMensagem] = useState("");
  const [mensagens, setMensagens] = useState<any>([]);
  const [nomeRemetente, setNomeRemetente] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const router = useRouter();
  const { id } = router.query;
  const { usuario } = useContext(UserCtx); // infos do usuário atual

  const enviarMsg = async (e: any) => {
    try {
      e.preventDefault();
      if (id !== null && usuario !== null) {
        const idMesclado =
          usuario.uid > id! ? usuario.uid + id : id + usuario.uid;
        await addDoc(collection(firebase.db, "mensagens", idMesclado, "chat"), {
          texto: novaMensagem,
          de: usuario.uid,
          para: id,
          data: Timestamp.fromDate(new Date()),
        });
        setNovaMensagem("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const obterInfosUsuarioFirestore = async (id: any) => {
    const infosFirestore = await getDoc(doc(firebase.db, "usuarios", id));
    if (infosFirestore.exists()) {
      setNomeRemetente(infosFirestore.data().usuario as string);
    }
  };

  const renderizarMensagens = () => {
    return mensagens.map((objs: any, i: any) => {
      return (
        <div
          key={objs.id}
          className={`${
            objs.de !== id ? "bg-[#2642D9]" : "bg-[#EFF2FC]"
          } text-white py-1 px-2 mt-2`}
        >
          <li>{objs.texto}</li>
          <span className="block text-right text-sm pt-2">
            {objs.data.toDate().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <span className="block text-right text-sm">
            {objs.data.toDate().toLocaleDateString()}
          </span>
        </div>
      );
    });
  };

  useEffect(() => {
    try {
      if (id !== null && usuario !== null) {
        obterInfosUsuarioFirestore(id);
        const idMesclado =
          usuario.uid > id! ? usuario.uid + id : id + usuario.uid;
        const unsub = onSnapshot(
          query(
            collection(firebase.db, "mensagens", idMesclado, "chat"),
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
  }, [id, usuario]);

  return (
    <div className="mx-auto mt-[2rem] max-w-[20rem]">
      <h2 className="text-center">
        {nomeRemetente && nomeRemetente.toLocaleUpperCase()}
      </h2>
      {erro && <p>{erro}</p>}
      <div className="h-[80vh] overflow-y-scroll">
        <ul>{renderizarMensagens()}</ul>
      </div>
      <form className="pt-[1rem]" onSubmit={enviarMsg}>
        <input
          className="outline-none bg-slate-500 text-white p-2 rounded-md"
          placeholder="Digite uma mensagem"
          type="text"
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
        />
        <input
          className="ml-[4rem] bg-slate-500 p-2 text-white rounded-md"
          type="submit"
          value="Enviar"
        />
      </form>
    </div>
  );
}
