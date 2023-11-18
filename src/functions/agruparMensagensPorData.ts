import { Mensagem } from "@/models/Mensagem";
import { formatarData } from "./formatarData";

/**
 * Método que agrupa mensagens por data
 * @param mensagens 
 * @returns 
 */
export function agruparMensagensPorData(mensagens: Mensagem[]) {
  const grupos: any = {};
  if (mensagens.length > 0) {
    mensagens.forEach((mensagem) => {
      const data = formatarData(mensagem.data.toDate());
      if (!grupos[data]) {
        grupos[data] = [];
      }
      grupos[data].push(mensagem);
    });
    return grupos;
  }
}
