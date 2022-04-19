import { GeneradorDistribucion } from "./GeneradorDistribucion";

// Clase abstracta para realizar una prueba de bondad de ajuste.
export abstract class PruebaBondad {
  // El valor de los grados de libertad.
  protected v: number;

  // El valor del estadístico de prueba calculado.
  protected estadisticoPrueba: number;

  // El valor del estadístico de prueba tabulado.
  protected estadisticoTabulado: number;

  // Una matriz para la tabla de la prueba.
  protected tablaPrueba: number[][];

  public abstract probar(generador: GeneradorDistribucion): Promise<any>

  // Informa el resultado de la prueba de bondad.
  public validarHipotesis(): string {
    // Si el estadistico calculado es mayor al tabulado, se rechaza la hipótesis nula.
    if (this.estadisticoPrueba > this.estadisticoTabulado)
      return 'Ya que el estadístico calculado es mayor al estadístico tabulado (' + this.estadisticoPrueba.toFixed(4) + ' > ' + this.estadisticoTabulado + '), se procede a rechazar la hipótesis nula.';

    // De lo contrario, no se puede rechazar la hipótesis nula.
    else
      return 'Ya que el estadístico calculado es menor o igual al estadístico tabulado (' + this.estadisticoPrueba.toFixed(4) + ' <= ' + this.estadisticoTabulado + '), no se puede rechazar la hipótesis nula.';
  }
  
  public getTabla(): number[][] {
    return this.tablaPrueba;
  }
}