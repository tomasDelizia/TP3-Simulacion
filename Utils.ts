export module Utils {
  function getPivot(vec: number[], izq: number, der: number): number {
    return vec[Math.floor((der + izq) / 2)];
  }
  
  // Implementación del algoritmo QuickSort en Typescript.
  export function quickSort(vec: number[], izq: number = 0, der: number = vec.length - 1): number[] {
    let pivot: number = getPivot(vec, izq, der);
  
    let i: number = izq;
    let j: number = der;
  
    while (i <= j) {
      while (vec[i] < pivot && i < der) {
        i++;
      }
  
      while (vec[j] > pivot && j > izq) {
        j--;
      }
  
      if (i <= j) {
        [vec[i], vec[j]] = [vec[j], vec[i]];
        i++;
        j--;
      }
    }
  
    if (izq < j) {
      quickSort(vec, izq, j);
    }
  
    if (i < der) {
      quickSort(vec, i, der);
    }
    return vec;
  }
  
  // Función que encuentra el primer índice de un vector cuyo valor es >= a un valor x.
  function indiceMenor(vec: number[], x: number): number {
      let izq: number = 0;
      let der: number = vec.length - 1;
      while (izq <= der) {
          let medio: number = Math.floor((izq + der) / 2);
          if (vec[medio] >= x)
            der = medio - 1;
          else
              izq = medio + 1;
      }
      return izq;
  }
     
  // Función que encuentra el primer índice de un vector cuyo valor es < a un valor y.
  function indiceMayor(vec: number[], y: number): number {
      let izq: number = 0;
      let der = vec.length - 1;
      while (izq <= der)
      {
          let medio: number = Math.floor((izq + der) / 2);
          if (vec[medio] < y)
              izq = medio + 1;
          else
              der = medio - 1;
      }
      return der;
  }
     
  // Función que cuenta los elementos de un vector en un rango dado.
  export function contarEnRango(vec: number[], limInf: number, limSup: number): number {
      let contador: number = indiceMayor(vec, limSup) - indiceMenor(vec, limInf) + 1;
      return contador;
  }
  
  // Función que cuenta los elementos de un vector en un que sean iguales a un valor dado.
  export function contarSi(vec: number[], valor: number): number {
    let contador: number = contarEnRango(vec, valor, valor + 0.01);
    return contador;
  }
  
  // Función que calcula el factorial de un número pasado por parámetro.
  export function factorial(x: number): number {
    if (x < 0) 
      return -1;
    else if (x === 0) 
      return 1;
    else
      return (x * factorial(x - 1));
  }  
}