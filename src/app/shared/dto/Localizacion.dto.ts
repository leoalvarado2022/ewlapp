export interface Provincia{
    cod_provincia: number;
    nombre: string;
}

export interface Canton{
    cod_canton: number;
    nombre: string;
}

export interface Distrito{
    cod_distrito: number;
    nombre: string;
    gam?: number;
}