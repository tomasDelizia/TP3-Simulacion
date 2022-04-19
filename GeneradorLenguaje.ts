import {GeneradorNumeros} from "./GeneradorNumeros";

// Clase que genera números pseudoaleatorios con distribución uniforme (0, 1) utilizando el generador de JavaScript.
export class GeneradorLenguaje implements GeneradorNumeros {
    // La secuencia de números pseudoaleatorios a generar.
    private rnds: number[];

    // Función que obtiene una secuencia de números aleatorios usando el Método Congruencial Lineal.
    public async generarNumerosPseudoaleatorios(n: number): Promise<any> {
      // Inicializamos el vector.
      this.rnds = [];

      // Generamos los números pseudoaleatorios.
      for (let i: number = 0; i < n; i++) {
          // Obtenemos el rnd.
          let rnd: number = Math.random();
          this.rnds.push(rnd);
      }
    }

    public getRnds(): number[] {
        return this.rnds;
    }
}