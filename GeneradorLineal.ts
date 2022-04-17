import {GeneradorNumeros} from "./GeneradorNumeros";

export class GeneradorLineal implements GeneradorNumeros {
    // La secuencia de números enteros usados para generar la secuencia pseudoaleatoria.
    private enteros: number[];
    // La secuencia de números pseudoaleatorios a generar.
    private rnds: number[];

    // Función que obtiene una secuencia de números aleatorios usando el Método Congruencial Lineal.
    public async generarNumerosPseudoaleatorios(n: number): Promise<any> {
      // Inicializamos los vectores.
      this.enteros = [];
      this.rnds = [];

      // Obtenemos los parámetros.
      let semilla: number = parseInt(prompt('Ingrese el valor de la semilla:', '0'), 10);
      while (semilla <= 0) {
        alert('Debe ingresar únicamente valores positivos');
        semilla = parseInt(prompt('Ingrese el valor de la semilla:', '0'), 10);
      }

      let c: number = parseInt(prompt('Ingrese la constante aditiva:', '0'), 10);
      while (c <= 0) {
        alert('Debe ingresar únicamente valores positivos');
        c = parseInt(prompt('Ingrese la constante aditiva:', '0'), 10);
      }

      let k: number = parseInt(prompt('Ingrese el valor de k:', '0'), 10);
      while (k <= 0) {
        alert('Debe ingresar únicamente valores positivos');
        k = parseInt(prompt('Ingrese el valor de k:', '0'), 10);
      }

      let g: number = parseInt(prompt('Ingrese el valor de g: ', '0'), 10);
      while (g <= 0) {
        alert('Debe ingresar únicamente valores positivos');
        g = parseInt(prompt('Ingrese el valor de g:', '0'), 10);
      }

      let a: number = 1 + 4 * k;
      let m: number = Math.pow(2, g);

      // Generamos los números pseudoaleatorios.
      for (let i: number = 0; i < n; i++) {
          // Obtenemos el xi.
          let xi: number = (a * semilla + c) % m;
          // Obtenemos el rnd.
          let rnd: number = Number((xi / m).toPrecision(4));
          // Guardamos los elementos en sus respectivos vectores.
          this.enteros.push(xi);
          this.rnds.push(rnd);
          // Actualizamos el valor de la semilla.
          semilla = xi;
      }
    }

    public getRnds(): number[] {
        return this.rnds;
    }
}