import { useState } from 'react';

import {ProductList} from "./ProductList";


export const Header = ({
    allProducts,
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal,
 
    
    
    }) => {
    const [active, setActive] = useState(false);
    const onDeleteProduct = product => {
    const results = allProducts.filter(
    item => item.id !== product.id
    
    );
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
    };

/** Agregar producto */
const onAddProduct = product => {
    if (allProducts.find(item => item.id === product.id)) {
        const products = allProducts.map(item =>
            item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setTotal(total + product.price );
        setCountProducts(countProducts + 1); // Solo incrementa la cantidad en 1
        return setAllProducts([...products]);
    }

    setTotal(total + product.price );
    setCountProducts(countProducts +1);
    setAllProducts([...allProducts, product]);
};
/** Quitar producto */
const onRemoveProduct = product => {
    const existingProduct = allProducts.find(item => item.id === product.id);

    if (existingProduct) {
        if (existingProduct.quantity === 1) {
            const updatedProducts = allProducts.filter(item => item.id !== product.id);
            setAllProducts(updatedProducts);
        } else {
            const updatedProducts = allProducts.map(item =>
                item.id === product.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
            setAllProducts(updatedProducts);
        }

        setTotal(total - product.price);
        setCountProducts(countProducts - 1);
    }
};

/*Limpiar variables*/
     
    const onCleanCart = () => {
        setAllProducts([]);
setTotal(0);
setCountProducts(0);
};

return (
    <header>

    <h1 >Café Himalaya</h1>
    <div className='container-icon'>
    <div
    className='container-cart-icon'
    onClick={() => setActive(!active)}
    >
    <img
    src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png"
    alt="carrito"
    className="icon-cart" />


    <div className='count-products'>
    <span id='contador-productos'>{countProducts}</span>
    </div>
    </div>



    <div
    className={`container-cart-products ${
    active ? '' : 'hidden-cart'
    }`}
    >
    {allProducts.length ? (
    <>
    <div className='row-product'>
    {allProducts.map(product => (
    <div className='cart-product'
    key={product.id}>

    <div className='info-cart-product'>

    {/**
     * 
     *  <span className='cantidad-producto-carrito'>
             {product.quantity} 
        </span> 
     * 
     * 
     */}
         <span className='img-producto-carrito'>      
        <img src={product.urlImage} style={{ width: '55px', height: '40px',   }}/>   
        </span>

        &nbsp;
        <p className='titulo-producto-carrito'>
        &nbsp; {product.title}  &nbsp;
        </p> 

        <span className='precio-producto-carrito'>
        &nbsp; ${product.price}  &nbsp;
        </span> 

      

        <p className='titulo-producto-carrito'>
       Cantidad:  
        </p> 

     {/*Input para sumar o restar al producto  */}
        <input

    
    type='number'  min={0}  value={product.quantity}    onChange={(e) => {
        const newQuantity = parseInt(e.target.value, 10);
            if (newQuantity >= 0) {
                if (newQuantity > product.quantity) {
                onAddProduct(product);
                 } else if (newQuantity < product.quantity) {
                onRemoveProduct(product);
            }
        }
    }}
        />

        






    </div>
<img
src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/s
igns-close-icon-png.png"
alt="cerrar"
className="icon-close"
onClick={() => onDeleteProduct(product)}
/>

</div>
))}
</div>

<div className='cart-total'>
<h3>Total:</h3>
<span className='total-pagar'>${total}</span>
</div>
<button className='btn-clear-all'
onClick={onCleanCart} >
Vaciar Carrito
</button>
</>
) : (
<p className='cart-empty'>El carrito está vacío</p>
)}
</div>
</div>
</header>
);
};
    
