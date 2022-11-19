export interface Paquete{
    codigo:string;
    destinatario:string;
    cliente:string;
    envia:string;
    direccion_entrega:string;
    estatus:string;
    estatus_nombre:string;
    telefono1:string;
    telefono2:string;
    obs:string;
    distrito:string;
    canton:string;
    provincia:string;
}

export interface DatosUsuario {
    cod_cliente: number;
    distrito_origen: number;
    gam: number;
    ndistrito_origen?: string;
    envia: string;
    telefono1: string;
    direccion_origen: string;
}

export interface DatosDestinatario {
    distrito_entrega: number;
    ndistrito_entrega?: string;
    gam: number;
    destinatario: string;
    telefono2: string;
    direccion_entrega: string;
    peso: number;
}

export interface PaqueteDatos {
    codigo: string;
    origen_gam: number;
    destino_gam: number;
    peso: number;
    fecha_entrega: string;
    fecha_ruta: string;
}

export interface PaqueteGuardar extends DatosUsuario,DatosDestinatario,PaqueteDatos {
    para_alisto?: string;
    entrega_rapida?: string;
}