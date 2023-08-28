exports.mostrarProductos = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${req.params.query}`;
    const response = await fetch(url);
    const results = await response.json();
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
            amount: result.price,
            decimals: result.price,
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
exports.obtenerProducto = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const url = `https://api.mercadolibre.com/items/${req.params.id}`;
  const urlDescripcion = `https://api.mercadolibre.com/items/${req.params.id}/description`;
  const response = await fetch(url);
  const responseDescripcion = await fetch(urlDescripcion);
  const result = await response.json();
  const resultDescripcion = await responseDescripcion.json();
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
        amount: result.price,
        decimals: result.price,
      },
      picture: result.pictures[0].url,
      condition: result.condition,
      free_shipping: result.shipping.free_shipping,
      sold_quantity: result.sold_quantity,
      description: resultDescripcion.plain_text,
    },
  };

  res.json(producto);
};
