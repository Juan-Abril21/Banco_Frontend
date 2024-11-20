export async function getClientes() {
    const url=`https://stingray-app-w2qjh.ondigitalocean.app/clientes`;
    const resp = await fetch(url);
    const data = await resp.json();
    const clientesLista = data.flatMap((cliente) =>
        cliente.cuentas.map((cuenta) => ({
            ID: cliente.id,
            cedula: cliente.cedula,
            nombre: cliente.nombre,
            saldo: cuenta.saldo,
            fechaCreacion: cuenta.fechaCreacion,
            cuentaId: cuenta.id,
            correo: cliente.correo,
        }))
         
    );
    console.log(data)
    return clientesLista;
}