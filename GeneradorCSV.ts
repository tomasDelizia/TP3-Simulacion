// Clase para generar y descargar archivos CSV.
export class GeneradorCSV {
  public generarArchivo(vec: any[], nombreArchivo: string): void {
    let contenidoCSV: string = "data:text/csv;charset=utf-8,";

    for (let i: number = 0; i < vec.length; i++) {
      const fila: string = vec[i] + ",";
      contenidoCSV += fila + "\r\n";
    }

    const encodedUri: string = encodeURI(contenidoCSV);
    const link: HTMLAnchorElement = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", nombreArchivo + ".csv");
    document.body.appendChild(link); 
    link.click();
  }
}