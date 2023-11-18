
/**
 * Método que retorna um valor aleatório de string
 * @param s
 * @returns 
 */
export function novoValorKeyProp(s: string) {
  return s + (Math.random() * 900).toFixed(1);
}