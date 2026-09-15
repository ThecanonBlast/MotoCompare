import { Motorcycle } from '../../domain/motorcycle/motorcycle.model';

export interface ComparisonRow {
  label: string;
  unit: string;
  format: 'number' | 'currency';
  valueA: number;
  valueB: number;
  winner: 'a' | 'b' | 'tie';
}

// Arma las filas de comparación entre dos motos, ya con el ganador de
// cada especificación calculado. El componente del comparador solo
// recorre esta lista y la pinta — no necesita saber cómo se decide
// quién gana cada fila.
export function buildComparisonRows(motoA: Motorcycle, motoB: Motorcycle): ComparisonRow[] {
  return [
    buildRow('Cilindrada', 'cc', 'number', motoA.cilindrada, motoB.cilindrada, 'higher'),
    buildRow('Potencia', 'hp', 'number', motoA.potencia, motoB.potencia, 'higher'),
    buildRow('Torque', 'Nm', 'number', motoA.torque, motoB.torque, 'higher'),
    buildRow('Precio', '', 'currency', motoA.precio, motoB.precio, 'lower'),
  ];
}

function buildRow(
  label: string,
  unit: string,
  format: 'number' | 'currency',
  valueA: number,
  valueB: number,
  bestWhen: 'higher' | 'lower',
): ComparisonRow {
  let winner: 'a' | 'b' | 'tie' = 'tie';

  if (valueA !== valueB) {
    const aIsBest = bestWhen === 'higher' ? valueA > valueB : valueA < valueB;
    winner = aIsBest ? 'a' : 'b';
  }

  return { label, unit, format, valueA, valueB, winner };
}
