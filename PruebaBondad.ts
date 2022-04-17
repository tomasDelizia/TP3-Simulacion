import { GeneradorDistribucion } from "./GeneradorDistribucion";

export abstract class PruebaBondad {
  protected v: number;
  protected estadisticoPrueba: number;
  protected estadisticoTabulado: number;
  protected tablaPrueba: number[][];

  public abstract probar(generador: GeneradorDistribucion): Promise<any>

  public validarHipotesis(): string {
    // Si el estadistico calculado es mayor al tabulado, se rechaza la hipótesis nula.
    if (this.estadisticoPrueba > this.estadisticoTabulado)
      return 'Ya que el estadístico calculado es mayor al estadístico tabulado (' + this.estadisticoPrueba.toFixed(4) + ' > ' + this.estadisticoTabulado + '), se procede a rechazar la hipótesis nula.';
    else
      return 'Ya que el estadístico calculado es menor o igual al estadístico tabulado (' + this.estadisticoPrueba.toFixed(4) + ' <= ' + this.estadisticoTabulado + '), no se puede rechazar la hipótesis nula.';
  }
  
  public getTabla(): number[][] {
    return this.tablaPrueba;
  }
}