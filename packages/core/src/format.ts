/** Formatea un entero como pesos colombianos: 42000 -> "$42.000". */
export function formatCOP(value: number): string {
  const n = Math.round(value);
  const sign = n < 0 ? '-' : '';
  const digits = Math.abs(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${sign}$${digits}`;
}
