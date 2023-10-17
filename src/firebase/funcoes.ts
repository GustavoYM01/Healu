import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { setDoc, doc, addDoc, collection } from "firebase/firestore";
import { firebase } from "../firebase/config";

/**
 * Método para cadastrar usuário com email e senha (padrão Single Factor Authenticator)
 * @param email
 * @param senha
 * @param auth
 * @returns
 */
export async function cadastrarUsuario(
  email: string,
  senha: string,
  auth: Auth = firebase.auth
): Promise<string> {
  try {
    await createUserWithEmailAndPassword(auth, email, senha).then(
      async (credentialsUser) => {
        if (credentialsUser) {
          await setDoc(doc(firebase.db, "usuarios", credentialsUser.user.uid), {
            id: credentialsUser.user.uid,
            usuario:
              credentialsUser.user.displayName ??
              credentialsUser.user.email?.split("@")[0],
            email: credentialsUser.user.email,
          });
          localStorage.setItem("autenticado", credentialsUser.user.uid);
        }
      }
    );
    return "OK";
  } catch (error: any) {
    return error?.message;
  }
}

/**
 * Método que realiza o logout do usuário
 * @param auth
 */
export async function sair(auth: Auth = firebase.auth) {
  try {
    await signOut(auth).then(() => localStorage.removeItem("autenticado"));
  } catch (error) {
    console.log(error);
  }
}

/**
 * Método que realiza o login do usuário
 * @param email
 * @param senha
 * @param auth
 * @returns
 */
export async function login(
  email: string,
  senha: string,
  auth: Auth = firebase.auth
): Promise<string> {
  try {
    await signInWithEmailAndPassword(auth, email, senha).then((x) => {
      localStorage.setItem("autenticado", x.user.uid);
    });
    return "OK";
  } catch (error: any) {
    return error?.message;
  }
}
