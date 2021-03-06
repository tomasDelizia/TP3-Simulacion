import { Chart } from "chart.js";
import { GeneradorVA } from "./GeneradorVA";

export module HTMLUtils {

  // Función para ocultar un elemento div.
  export function ocultarSeccion(div: HTMLDivElement): void {
    div.style.display = 'none';
  }

  // Función para mostrar un elemento div.
  export function mostrarSeccion(div: HTMLDivElement): void {
    div.style.display = 'block';
  }

  // Función para alertar un éxito.
  export function alertarExito(div: HTMLDivElement): void {
    div.classList.replace('alert-light', 'alert-success');
    div.classList.replace('alert-danger', 'alert-success');
  }

  // Función para alertar un fracaso.
  export function alertarFracaso(div: HTMLDivElement): void {
    div.classList.replace('alert-light', 'alert-danger');
    div.classList.replace('alert-success', 'alert-danger');
  }

  // Función que elimina todas las filas de la tabla HTML excepto los encabezados.
  export function limpiarTabla(tabla: HTMLTableElement) {
    for (let i: number = tabla.rows.length; i > 1; i--) {
      tabla.deleteRow(i - 1);
    }
  }

  // Agregar una fila a una tabla html a partir de un vector pasado por parámetro.
  export function agregarFilaATabla(fila: any[], tabla: HTMLTableElement) {
  let filaHTML: HTMLTableRowElement = tabla.getElementsByTagName('tbody')[0].insertRow();
  for (let i: number = 0; i < fila.length; i++) {
    let celda: HTMLTableDataCellElement = filaHTML.insertCell();
    celda.appendChild(document.createTextNode(String(fila[i])));
    }
  }

  // Función que genera un histograma de frecuencias.
  export function generarGrafico(histograma: HTMLCanvasElement, labels: any[], data: any[]): Chart {
    const area: CanvasRenderingContext2D = histograma.getContext('2d');
    return new Chart(area,  {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Frecuencias observadas',
            data: data,
            backgroundColor: '#F8C471',
          },
        ],
      },
      options: {
        scales: {
          yAxes: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}