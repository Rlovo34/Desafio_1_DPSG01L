import {Header} from './components/Header';
import {ProductList} from './components/ProductList';
import { useState } from 'react';



function App() {
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);
  

return (
<>
<Header allProducts={allProducts} setAllProducts={setAllProducts} total={total} setTotal={setTotal} countProducts={countProducts} setCountProducts={setCountProducts}>

</Header>

<ProductList allProducts={allProducts} setAllProducts={setAllProducts} total={total} setTotal={setTotal} countProducts={countProducts} setCountProducts={setCountProducts}>
  
</ProductList>
</>
);
}
export default App;