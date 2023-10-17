import UserCtx from "@/contexts/UserContext";
import { firebase } from "@/firebase/config";
import {
  DocumentData,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useContext, useState, useEffect } from "react";

interface PesquisarUsuariosProps {
  className?: string;
}

interface SearchResult {
  id: string;
  data: DocumentData;
}

export default function PesquisarUsuarios(props: PesquisarUsuariosProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [usuarios, setUsuarios] = useState<SearchResult[]>([]);
  const [nenhumResultado, setNenhumResultado] = useState(false);
  const { usuario } = useContext(UserCtx);

  const pesquisarUsuario = (param: string) => {
    if (param.length == 0 || param == "") {
      setSearchResults([]);
      setNenhumResultado(false);
      return;
    }
    const usuariosFiltrados = usuarios.filter((x) =>
      x.data.usuario?.includes(param)
    );
    if (usuariosFiltrados.length > 0) {
      setSearchResults(usuariosFiltrados);
      setNenhumResultado(false);
    } else {
      setSearchResults([]);
      setNenhumResultado(true);
    }
  };

  const obterUsuarios = async () => {
    if (usuario) {
      const usersRef = collection(firebase.db, "usuarios");
      const docSnap = await getDocs(
        query(usersRef, where("id", "!=", usuario.uid as string))
      );
      const result = docSnap.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setUsuarios(result);
    }
  };

  useEffect(() => {
    obterUsuarios();
  }, [usuario]);

  return (
    <div className={`${props.className} max-w-[20rem]`}>
      <h2>Pesquisar Usuários</h2>
      <form className="w-[100%]">
        <input
          className="outline-none bg-slate-500 text-white py-1 px-2 rounded-md"
          placeholder="Informe um usuário"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value.trim().toLowerCase());
            pesquisarUsuario(e.target.value.trim().toLowerCase());
          }}
        />
        <input
          type="submit"
          className="
          cursor-pointer
          ml-[2.5rem]
          bg-slate-400 text-white 
          p-2 rounded-lg
          "
          value="Pesquisar"
        />
      </form>
      {nenhumResultado && searchResults.length === 0 && (
        <p>Nenhum usuário encontrado.</p>
      )}
      {searchResults.length > 0 && (
        <div className="mt-[1rem]">
          {searchResults.map((user) => (
            <a
              className="block w-[100%] bg-slate-300 py-1 px-2 mt-[1rem] rounded-lg"
              key={user.id}
              href={`/chat/${user.id}`}
            >
              {user.data.usuario}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
