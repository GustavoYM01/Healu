/**
 * Método para verificar o conteúdo do contexto do usuário
 * @param usuarioCtx
 * @returns
 */
export function verificarContextoUsuario(usuarioCtx: any) {
  return (
    usuarioCtx !== null &&
    Object.keys(usuarioCtx).includes("uid") &&
    (usuarioCtx.uid as string).length > 0
  );
}
