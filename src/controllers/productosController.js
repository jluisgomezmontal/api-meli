// Importamos el módulo axios para realizar solicitudes HTTP
import axios from "axios";

// Controlador para mostrar una lista de productos según un criterio de búsqueda
export const mostrarProductos = async (req, res) => {
  // Establecemos encabezado para permitir solicitudes de origen cruzado
  res.header("Access-Control-Allow-Origin", "*");
  try {
    // Construimos la URL de la API de MercadoLibre utilizando el parámetro de búsqueda
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${req.params.query}`;

    // Realizamos la solicitud GET a la URL
    const response = await axios.get(url);
    const results = response.data;

    // Mapeamos los resultados para obtener la información necesaria de los productos
    const productos = results.results.map((result, idx) => {
      return {
        author: {
          name: "Jose Luis",
          lastname: "Gomez",
        },
        categories: results.filters[0].values.map((v) => v.name),
        items: {
          id: result.id,
          title: result.title,
          price: {
            currency: result.currency_id,
            amount: parseInt(result.price, 10),
            decimals: result.price.toString().split(".")[1],
          },
          picture: `https://http2.mlstatic.com/D_${result.thumbnail_id}-O.jpg`,
          condition: result.condition,
          free_shipping: result.shipping.free_shipping,
          city: result.seller_address.state.name,
        },
      };
    });

    // Enviamos la respuesta en formato JSON con la información de los productos
    res.json(productos);
  } catch (error) {
    console.log(error);
  }
};

// Controlador para obtener información detallada de un producto por su ID
export const obtenerProducto = async (req, res) => {
  // Establecemos encabezado para permitir solicitudes de origen cruzado
  res.header("Access-Control-Allow-Origin", "*");

  // Construimos las URLs de las APIs de MercadoLibre para obtener información del producto y su descripción
  const url = `https://api.mercadolibre.com/items/${req.params.id}`;
  const urlDescripcion = `https://api.mercadolibre.com/items/${req.params.id}/description`;

  try {
    // Realizamos las solicitudes GET a las URLs
    const response = await axios.get(url);
    const responseDescripcion = await axios.get(urlDescripcion);

    // Obtenemos los resultados de las respuestas
    const result = response.data;
    const resultDescripcion = responseDescripcion.data;

    // Construimos la URL de la categoría del producto
    const urlCategoria = `https://api.mercadolibre.com/categories/${result.category_id}`;
    const responseCategoria = await axios.get(urlCategoria);
    const resultCategoria = responseCategoria.data;

    // Construimos el objeto de producto con la información obtenida
    const producto = {
      author: {
        name: "Jose Luis",
        lastname: "Gomez",
      },
      item: {
        id: result.id,
        title: result.title,
        price: {
          currency: result.currency_id,
          amount: parseInt(result.price, 10),
          decimals: result.price.toString().split(".")[1],
        },
        picture: result.pictures[0].url,
        condition: result.condition,
        free_shipping: result.shipping.free_shipping,
        sold_quantity: result.sold_quantity,
        categoria: resultCategoria.name,
        description: resultDescripcion.plain_text,
      },
    };

    // Enviamos la respuesta en formato JSON con la información del producto
    res.json(producto);
  } catch (error) {
    console.log(error);
  }
};
