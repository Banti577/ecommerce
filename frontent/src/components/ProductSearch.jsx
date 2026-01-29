import React, { useState } from 'react';

const ProductSearch = () => {
  const products = [
    { id: 1, name: "Wireless Headphones" },
    { id: 2, name: "Running Shoes" },
    { id: 3, name: "Coffee Maker" }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search product name..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      
      <ul>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => <li key={p.id}>{p.name}</li>)
        ) : (
          <li>No products found</li>
        )}
      </ul>
    </div>
  );
};

export default ProductSearch;
