/**
 * Método para verificar usuário autenticado
 * @returns Se usuário foi autenticado, retorna true, se não, retorna false
 */
export function verificarAutenticado() {
  return (
    localStorage.getItem("autenticado") !== null &&
    localStorage.getItem("autenticado") !== ""
  );
}
