import { TipoDocumento } from '../tipodocumento';

export class Alumno {
  idAlumno: number;
  nombre: string;
  apellido1: string;
  apellido2: string;
  idTipoDocumento: number;
  numeroDocumento: string;
  fechaNacimiento: Date;
  observaciones: string;
  version: number;
  tipoDocumento: TipoDocumento = null;
}
