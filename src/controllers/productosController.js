
exports.mostrarProductos = async(req, res) =>{
  try {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${req.params.query}`
    const response = await fetch(url);
    const results = await response.json();
    const productos = results.results.map(result => ({
      author: {
        name: 'Jose Luis',
        lastname: 'Gomez'
      },
      categories: results.filters[0]?.values[0].name,
      items: {
        id: result.id,
        title: result.title,
        price: {
          currency: result.currency_id,
          amount: result.price,
          decimals: result.price
            },
          picture: result.thumbnail,
          condition: result.condition,
          free_shipping: result.shipping.free_shipping
        }
      }));
      ;
      res.json(productos);
      res.header('Access-Control-Allow-Origin', '*');
    } catch (error) {
      console.log(error)
  }
}
exports.obtenerProducto = async(req, res) =>{

  const url = `https://api.mercadolibre.com/items/${req.params.id}`
  const response = await fetch(url);
  const result = await response.json();
  const producto =
  {
    author: {
      name: 'Jose Luis',
      lastname: 'Gomez'
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
      description: result.description
    }
   }

   res.json(producto);
   res.header('Access-Control-Allow-Origin', '*');
  }
