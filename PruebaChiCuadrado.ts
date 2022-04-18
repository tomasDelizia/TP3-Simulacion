import { GeneradorDistribucion } from "./GeneradorDistribucion";
import { PruebaBondad } from "./PruebaBondad";

export class PruebaChiCuadrado extends PruebaBondad {
  // Tabla de distribución Chi Cuadrado con p = 0.95, para grados de libertad entre 1 y 30.
  private tablaChiCuadrado: number[] = [
    3.841, 5.991, 7.815, 9.488, 11.07, 12.592, 14.067, 15.507, 16.919, 18.307,
    19.675, 21.026, 22.362, 23.685, 24.996, 26.296, 27.587, 28.869, 30.144, 31.41,
    32.671, 33.924, 35.172, 36.415, 37.652, 38.885, 40.113, 41.337, 42.557, 43.773,
  ];

  private k: number;
  private m: number;

  public async probar(generador: GeneradorDistribucion): Promise<any> {
    this.tablaPrueba = [];
    let tablaDistribucion: number[][] = generador.getTabla();

    // Agrupamos las frecuencias esperadas que no sean mayores o iguales a 5.
    let sumaFrecObs: number = 0;
    let sumaFrecEsp: number = 0;
    let desde: number = tablaDistribucion[0][0];
    this.estadisticoPrueba = 0;
    for (let i: number = 0; i < tablaDistribucion.length; i++) {
      let frecObservada: number = tablaDistribucion[i][4];
      let frecEsperada: number = tablaDistribucion[i][6];
      sumaFrecEsp += frecEsperada;
      sumaFrecObs += frecObservada;
      if (sumaFrecEsp < 5) {
        // Si estamos en la última iteración, debemos agrupar con el intervalo anterior.
        if (i === tablaDistribucion.length - 1) {
          desde = this.tablaPrueba[this.tablaPrueba.length - 1][0];
          let hasta: number = tablaDistribucion[i][1];
          sumaFrecObs += this.tablaPrueba[this.tablaPrueba.length - 1][2];
          sumaFrecEsp += this.tablaPrueba[this.tablaPrueba.length - 1][3];
          let estadistico: number = (Math.pow((sumaFrecObs - sumaFrecEsp), 2)) / sumaFrecEsp;
          this.estadisticoPrueba += estadistico;
          this.tablaPrueba[this.tablaPrueba.length - 1] = [
            desde,
            hasta,
            sumaFrecObs,
            sumaFrecEsp,
            estadistico,
            this.estadisticoPrueba
          ];
        }
      }
      else {
        let estadistico: number = (Math.pow((sumaFrecObs - sumaFrecEsp), 2)) / sumaFrecEsp;
        this.estadisticoPrueba += estadistico;
        let hasta: number = tablaDistribucion[i][1];
        this.tablaPrueba.push([
          desde,
          hasta,
          sumaFrecObs,
          sumaFrecEsp,
          estadistico,
          this.estadisticoPrueba
        ]);
        sumaFrecObs = 0;
        sumaFrecEsp = 0;
        desde = hasta;
      }
    }

    // Obtenemos el valor del estadístico de tabulado y los grados de libertad.
    this.k = this.tablaPrueba.length;
    this.m = -1;
    if (generador.constructor.name === 'GeneradorPoisson')
      this.m = 2;
    else {
      this.m = 1;
    }
    this.v = this.k - this.m - 1;
    this.estadisticoTabulado = this.tablaChiCuadrado[this.v-1];
  }

  public validarHipotesis(): string {
    if (this.v <= 0 || this.v > 30) {
      return 'No se puede realizar la prueba Chi-Cuadrado,';
    }
    // Si el estadistico calculado es mayor al tabulado, se rechaza la hipótesis nula.
    if (this.estadisticoPrueba > this.estadisticoTabulado)
    return 'Ya que el estadístico calculado es mayor al estadístico tabulado (' + this.estadisticoPrueba.toFixed(4) + ' > ' + this.estadisticoTabulado + '), se procede a rechazar la hipótesis nula.';
    else
      return 'Ya que el estadístico calculado es menor o igual al estadístico tabulado (' + this.estadisticoPrueba.toFixed(4) + ' <= ' + this.estadisticoTabulado + '), no se puede rechazar la hipótesis nula.';
  }
}