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

export interface Precio {
    precio: number;
    IVA: number;
    total: number;
}

export interface PreciosMembresia {
    cod_detalle_plan: number;
    destino: string;
    origen: string;
    precio_base: number;
}

export interface PaqueteResponse {
    msg: string;
    paquete: {
        codigo: string,
        consecutivo: string,
        link: string
    };
}