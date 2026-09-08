import { Motorcycle } from '../../domain/motorcycle/motorcycle.model';

const MAX_RECOMMENDATIONS = 6;

// Sugiere motos para el carrusel del comparador: prioriza motos de la
// misma categoría que la moto principal (son las comparaciones que más
// sentido tienen) y completa con el resto si hacen falta más sugerencias.
export function getRecommendedMotorcycles(
  mainMotorcycle: Motorcycle,
  allMotorcycles: Motorcycle[],
): Motorcycle[] {
  const others = allMotorcycles.filter((moto) => moto.id !== mainMotorcycle.id);
  const sameCategory = others.filter((moto) => moto.categoria === mainMotorcycle.categoria);
  const restOfCategories = others.filter((moto) => moto.categoria !== mainMotorcycle.categoria);

  return [...sameCategory, ...restOfCategories].slice(0, MAX_RECOMMENDATIONS);
}
