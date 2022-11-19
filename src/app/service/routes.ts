const urlv1= "https://api.ewl-cr.com";
const url= "https://api.ewl-cr.com/v2";
const urlUser = `${url}/usuario`;
const urlPackage = `${url}/paqueteria`;
export const routes = {
    login: () => {
        return `${urlUser}/login`
    },
    getPendientes: () => {
        return `${urlPackage}/no_entregados`
    },
    tracking: (tr: string) => {
        return `${urlPackage}/tracking/${tr}`
    },
    savePackage: () => {
        return `${urlPackage}/crearPaquete`
    },
    provincia: () => {
        return `${urlv1}/provincia`
    },
    canton: (provincia_id: string) => {
        return `${urlv1}/canton/${provincia_id}`
    },
    distrito: (canton_id: string) => {
        return `${urlv1}/distrito/${canton_id}`
    },
    allLocalizacion: (params?: any) => {
        const _params = new URLSearchParams(params);
        return `${urlv1}/distritos/all?${_params}`
    }
}