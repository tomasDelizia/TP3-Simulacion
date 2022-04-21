import { GeneradorVA } from "./GeneradorVA";

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

  // La descripción del resultado de la prueba de bondad.
  protected resultado: string;

  public abstract probar(generador: GeneradorVA): Promise<any>

  // Indica si se superó la prueba con éxito o no.
  public validarHipotesis(): boolean {
    // Si el estadistico calculado es mayor al tabulado, se rechaza la hipótesis nula.
    if (this.estadisticoPrueba > this.estadisticoTabulado) {
      this.resultado = 'Ya que el estadístico calculado es mayor al estadístico tabulado (' + this.estadisticoPrueba.toFixed(4) + ' > ' + this.estadisticoTabulado + '), se procede a rechazar la hipótesis nula.';
      return false;
    }
    // De lo contrario, no se puede rechazar la hipótesis nula.
    else {
      this.resultado = 'Ya que el estadístico calculado es menor o igual al estadístico tabulado (' + this.estadisticoPrueba.toFixed(4) + ' <= ' + this.estadisticoTabulado + '), no se puede rechazar la hipótesis nula.';
      return true;
    }
  }
  
  public getTabla(): number[][] {
    return this.tablaPrueba;
  }

  public getResultado(): string {
    return this.resultado;
  }
}