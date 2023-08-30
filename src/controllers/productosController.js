import axios from "axios";

export const mostrarProductos = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${req.params.query}`;
    const response = await axios.get(url);
    const results = response.data;
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
    res.json(productos);
  } catch (error) {
    console.log(error);
  }
};

export const obtenerProducto = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const url = `https://api.mercadolibre.com/items/${req.params.id}`;
  const urlDescripcion = `https://api.mercadolibre.com/items/${req.params.id}/description`;

  try {
    const response = await axios.get(url);
    const responseDescripcion = await axios.get(urlDescripcion);

    const result = response.data;
    const resultDescripcion = responseDescripcion.data;

    const urlCategoria = `https://api.mercadolibre.com/categories/${result.category_id}`;
    const responseCategoria = await axios.get(urlCategoria);
    const resultCategoria = responseCategoria.data;

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

    res.json(producto);
  } catch (error) {
    console.log(error);
  }
};
