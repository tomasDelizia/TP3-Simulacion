import { GeneradorVA } from "./GeneradorVA";
import { PruebaBondad } from "./PruebaBondad";

// Clase para realizar la prueba Chi-Cuadrado.
export class PruebaChiCuadrado extends PruebaBondad {
  // Tabla de distribución Chi Cuadrado con p = 0.95, para grados de libertad entre 1 y 30.
  private tablaChiCuadrado: number[] = [
    3.841, 5.991, 7.815, 9.488, 11.07, 12.592, 14.067, 15.507, 16.919, 18.307,
    19.675, 21.026, 22.362, 23.685, 24.996, 26.296, 27.587, 28.869, 30.144, 31.41,
    32.671, 33.924, 35.172, 36.415, 37.652, 38.885, 40.113, 41.337, 42.557, 43.773,
  ];

  // El valor de la cantidad de intervalos de la tabla Chi-Cuadrado.
  private k: number;

  // El valor de parámetros calculados para la prueba.
  private m: number;

  public async probar(generador: GeneradorVA): Promise<any> {
    this.tablaPrueba = [];
    let tablaDistribucion: number[][] = generador.getTabla();

    // Agrupamos las frecuencias esperadas que no sean mayores o iguales a 5.
    let sumaFrecObs: number = 0;
    let sumaFrecEsp: number = 0;
    let desde: number = tablaDistribucion[0][0];
    this.estadisticoPrueba = 0;

    // Iteramos mientras haya filas en la tabla de distribución.
    for (let i: number = 0; i < tablaDistribucion.length; i++) {
      // Obtenemos los valores de las frecuencias observada y esperada y los sumamos a las variables de suma.
      let frecObservada: number = tablaDistribucion[i][4];
      let frecEsperada: number = tablaDistribucion[i][6];
      sumaFrecEsp += frecEsperada;
      sumaFrecObs += frecObservada;

      // Si la frecuencia esperada acumulada es menor a 5.
      if (sumaFrecEsp < 5) {
        // Si estamos en la última iteración, debemos agrupar con el último intervalo de la tabla Chi-Cuadrado.
        if (i === tablaDistribucion.length - 1) {
          desde = this.tablaPrueba[this.tablaPrueba.length - 1][0];
          let hasta: number = tablaDistribucion[i][1];
          sumaFrecObs += this.tablaPrueba[this.tablaPrueba.length - 1][2];
          sumaFrecEsp += this.tablaPrueba[this.tablaPrueba.length - 1][3];
          let estadistico: number = (Math.pow((sumaFrecObs - sumaFrecEsp), 2)) / sumaFrecEsp;
          this.estadisticoPrueba += estadistico;
          this.tablaPrueba[this.tablaPrueba.length - 1] = [
            Number(desde.toFixed(4)),
            Number(hasta.toFixed(4)),
            Number(sumaFrecObs.toFixed(4)),
            Number(sumaFrecEsp.toFixed(4)),
            Number(estadistico.toFixed(4)),
            Number(this.estadisticoPrueba.toFixed(4))
          ];
        }
      }

      // Si la frecuencia esperada acumulada es igual o mayor a 5, generamos un nuevo intervalo en la tabla Chi-Cuadrado.
      else {
        let estadistico: number = (Math.pow((sumaFrecObs - sumaFrecEsp), 2)) / sumaFrecEsp;
        this.estadisticoPrueba += estadistico;
        let hasta: number = tablaDistribucion[i][1];
        this.tablaPrueba.push([
          Number(desde.toFixed(4)),
          Number(hasta.toFixed(4)),
          Number(sumaFrecObs.toFixed(4)),
          Number(sumaFrecEsp.toFixed(4)),
          Number(estadistico.toFixed(4)),
          Number(this.estadisticoPrueba.toFixed(4))
        ]);
        sumaFrecObs = 0;
        sumaFrecEsp = 0;
        desde = hasta;
      }
    }

    // Obtenemos el valor del estadístico tabulado y los grados de libertad.
    this.k = this.tablaPrueba.length;
    switch (generador.constructor.name) {
      case 'GeneradorUniforme':
        this.m = 0;
        break;
      case 'GeneradorNormal':
        this.m = 2;
        break;
      case 'GeneradorExponencial': case 'GeneradorPoisson':
        this.m = 1;  
        break;  
    }
    this.v = this.k - this.m - 1;
    this.estadisticoTabulado = this.tablaChiCuadrado[this.v-1];
  }

  public validarHipotesis(): boolean {
    // Si los grados de libertad no están tabulados, no se puede hacer la prueba.
    if (this.v <= 0 || this.v > 30) {
      this.resultado = 'No se puede realizar la prueba Chi-Cuadrado.';
      return false;
    }
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
}