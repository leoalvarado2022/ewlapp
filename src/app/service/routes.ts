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
    }
}