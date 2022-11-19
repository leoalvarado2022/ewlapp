export interface User {
  cod_usuario: number;
  cod_tipo_usuario: number;
  api_key: string;
  secret_key: string;
  correo: string;
  tipo_pago_cliente: number;
  cod_plan: number;
  nombre: string;
  apellido: string;
  membresia: Array<any>;
  plan: Array<any>;
  metadatos: Array<any>;
  telefono_movil?: string;
  direccion_completa?: string;
  distrito?: number;
  nombre_distrito?: string;
}