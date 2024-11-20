export const getCliente = async(cedula) => {
    const url=`https://stingray-app-w2qjh.ondigitalocean.app/cliente/${cedula}`;
    const resp=await fetch(url);
    const data=await resp.json();
    const cliente = {
        nombre: data.nombre,
        cedula: data.cedula,
    }
    console.log(cliente);
    return cliente;
}
