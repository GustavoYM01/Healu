/**
 * Método que retorna uma data por extenso
 * Ex.: 10 de novembro de 2023
 * @param data
 */
export function formatarData(data: Date) {
  const mesesExtensos = [
    "janeiro",
    "Fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  return `${data.getDate()} de ${
    mesesExtensos[(data.getMonth() + 1) - 1]
  } de ${data.getFullYear()}`;
}
