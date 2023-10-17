import { createContext, useEffect, useState } from "react";
import { firebase } from "../firebase/config";
import { User } from "firebase/auth";

const UserCtx = createContext({} as any);

export function UserProvider(props: any) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const alterarEstadoAutenticacao = firebase.authState(
      firebase.auth,
      (authUser) => {
        if (authUser !== null) setUser(authUser);
      }
    );
    return () => alterarEstadoAutenticacao();
  }, []);

  return (
    <UserCtx.Provider value={{ usuario: user }}>
      {props.children}
    </UserCtx.Provider>
  );
}

export default UserCtx;
