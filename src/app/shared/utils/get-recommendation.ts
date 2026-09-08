import { Motorcycle } from '../../domain/motorcycle/motorcycle.model';

// Genera el texto de recomendación al comparar dos motos.
// Es una vista previa de diseño: la recomendación real (basada en IA)
// se conecta más adelante, según la especificación del proyecto.
export function getRecommendationText(motoA: Motorcycle, motoB: Motorcycle): string {
  const masPotente = motoA.potencia >= motoB.potencia ? motoA : motoB;
  const masEconomica = motoA.precio <= motoB.precio ? motoA : motoB;

  if (masPotente.id === masEconomica.id) {
    return `La ${masPotente.marca} ${masPotente.modelo} es la opción más completa de esta comparación: buen desempeño sin ser la más costosa.`;
  }

  return `Si priorizas potencia, la ${masPotente.marca} ${masPotente.modelo} puede ser mejor opción. Si prefieres cuidar el presupuesto, la ${masEconomica.marca} ${masEconomica.modelo} es la alternativa más económica.`;
}
