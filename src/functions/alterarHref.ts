/**
 * Método para redirecionar à página definida
 * @param pagina
 */
export function alterarHref(pagina: string) {
  if (pagina.length > 0 || pagina !== "") location.href = pagina;
}
