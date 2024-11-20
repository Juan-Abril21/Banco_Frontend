export const postCliente = async (cliente) => {
    const url = 'https://stingray-app-w2qjh.ondigitalocean.app/cliente';
    console.log('Agregando cliente', cliente);
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });
  
    if (resp.ok) {
      // La solicitud fue exitosa (código de estado 2xx)
      console.log('El cliente se ha agregado correctamente');
      // Aquí puedes realizar acciones adicionales si es necesario
    } else {
      // La solicitud no fue exitosa (código de estado diferente de 2xx)
      console.error('Error al agregar el cliente');
      // Aquí puedes manejar el error o mostrar un mensaje de error al usuario
    }
  };
    