/**
 * Método que retorna uma palavra com a 1ª letra maiúscula
 * @param termo 
 * @returns 
 */
export function primeiraLetraMaiuscula(termo: string) {
  return termo.charAt(0).toUpperCase() + termo.substring(1);
}
