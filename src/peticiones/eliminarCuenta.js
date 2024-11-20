
export const eliminarCuenta = async (id) => {
    const url = `https://stingray-app-w2qjh.ondigitalocean.app/cuenta/eliminar/${id}`;
    try {
      const resp = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Procesar la respuesta aquí
      // Por ejemplo, si esperas una respuesta JSON:
      const data = await resp.json();
      return data;
    } catch (error) {
      // Manejar el error aquí
      console.error(error);
      throw error;
    }
  };