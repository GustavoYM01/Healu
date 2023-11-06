import { Timestamp } from "firebase/firestore";

export type Mensagem = {
  id: string;
  de: string;
  para: string;
  texto: string;
  data: Timestamp;
};
