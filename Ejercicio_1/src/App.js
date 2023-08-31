import React, { useMemo, useState } from 'react';
import './App.css';
import DropdownList from './components/dropdownList/DropdownList';
import data from './datos.json';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productList, setProductList] = useState([]);


  /* evento caso de repetirce el nombre*/
  const handleProductChange = (event) => {
    const selectedProductName = event.target.value;
    const selectedProductData = data.find(product => product.nombre === selectedProductName);
    setSelectedProduct(selectedProductData);
  };


  /* Agregar producto*/
  const handleAddProduct = (product) => {
    /* negacion en caso de seleccionar el mmismo producto*/
    if (!product) {
      return;
    }

/* reedondeo a 2 decimales */
    const hasElement = productList.findIndex(prod => prod.nombre === product.nombre);
    /*Elemento igual o mayor a 0 */
    if (hasElement >= 0) {
      const element = productList[hasElement];
      const uniqueArray = productList.filter(prod => prod.nombre !== product.nombre);
      console.log(uniqueArray);
      setProductList([...uniqueArray, { ...element, cuantity: element.cuantity + 1 }])
      return;
    }
    /*name prducto y cantidad */
    setProductList((p) => [...p, { ...product, cuantity: 1 }]);
  }

  /* Agregar repetido como evento  */
  const handleOnChange = (product, event) => {
    const hasElement = productList.findIndex(prod => prod.nombre === product.nombre);
    if (hasElement >= 0) {
      const element = productList[hasElement];
      /**Filtro en caso de repertirce la accion */
      const uniqueArray = productList.filter(prod => prod.nombre !== product.nombre);
      console.log(uniqueArray);
      setProductList([...uniqueArray, { ...element, cuantity: event.target.value }])
      return;
    }
  }
/*Borrar producto */
  const handleDeleteProduct = (product) => {
    const hasElement = productList.findIndex(prod => prod.nombre === product.nombre);
    if (hasElement >= 0) {
      const element = productList[hasElement];
      const uniqueArray = productList.filter(prod => prod.nombre !== product.nombre);
      setProductList([...uniqueArray])
      return;
    }

  }

  /**contador de total */
  const total = useMemo(() => {
    let currentTotal = 0;
    productList.forEach((prod) => {
      currentTotal += Number((prod.cuantity * prod.precio).toFixed(2));
    })

    return currentTotal.toFixed(2);
  }, [productList])

  return (
    

    <div className="App">
      <body>
      <h1>Lista de Productos</h1>
      
      <DropdownList options={data} handleChange={handleProductChange} /> ---
      <img src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png" alt="carrito"className="icon-cart" onClick={() => handleAddProduct(selectedProduct)}/>

        <hr/>
        <br/>


      

      <div  className='cantidad-producto-carrito' >
        {productList.map((product, index) => (
          <div className='titulo-producto-carrito' key={product.nombre}>

            {product.nombre} --     --* Precio$ {product.precio} --      --* Cantidad <input type='number' value={product.cuantity} min={0} onChange={(e) => handleOnChange(product, e)} />
           
            ----   <img src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"alt="cerrar"className="icon-close"
            onClick={() => handleDeleteProduct(product)}/>
            <hr/>
            <br/>

          </div>



        ))}
      </div>
      <div className='precio-producto-carrito'>Total: { total }</div>

      </body>
    </div>
  );


}

export default App;





