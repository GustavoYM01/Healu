/**
 * Método que verifica se o id do router query tem valor
 * @param id
 */
export function verificarIdQuery(id: string | any) {
  return id !== null && id !== undefined && id !== "undefined" && id !== "";
}
