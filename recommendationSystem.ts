// Simple product store using dictionary for O(1) lookups
// Pros: Constant Time Complexity --> lookups, adding, deleting
// Cons: Creating relationships, cannot create structure relationships
// Use case: Core inventory
import { Heap, ProductGraph } from "./DS";
import { products, Product } from "./models";

const relGraph = new ProductGraph();
const maxPrice = new Heap<Product>(
  "max",
  Object.values(products),
  (p) => p.price
)
const minPrice = new Heap<Product>(
  "min",
  Object.values(products),
  (p) => p.price
)
const trending = new Heap<Product>(
  "max",
  Object.values(products),
  (p) => p.popularity
);

// CRUD operations
function addProduct(product: Product) {
  product.id = Object.keys(products).length + 1;
  if (Object.keys(products).length in products) {
    while (product.id in products) product.id--;
  }

  relGraph.insert(product);
  trending.insert(product);
  maxPrice.insert(product);
  minPrice.insert(product);
  products[product.id] = product;
}

function updateProduct(id: number, updates: Partial<Product>) {
  if (!products[id]) {
    return false;
  }

  const oldProduct = products[id]
  products[id] = { ...products[id], ...updates };

  relGraph.update(products[id]);
  maxPrice.update(products[id], oldProduct);
  minPrice.update(products[id], oldProduct);
  trending.update(products[id], oldProduct);
}

function deleteProduct(id: number) {
  relGraph.del(id);
  maxPrice.del(products[id]);
  minPrice.del(products[id]);
  trending.del(products[id]);
  delete products[id];
}

function searchProductByName(name: string) {
  // Time Complexity: O(n)
  return Object.values(products).filter(
    (p) => p.name.toLowerCase().includes(name.toLowerCase()) // case --> case, phone case, phonecase
  );
}

console.log("adding ipad pro")
addProduct({
  id: -1,
  name: "IPad Pro",
  tags: ["electronic", "tablet", "IPad", "apple"],
  price: 2000,
  quantity: 1,
  popularity: 150
})

const delProd = 10
console.log(`deleting products[${delProd}]`, products[delProd]);
deleteProduct(delProd);
console.log(`products[${delProd}] after delete`, products[delProd]);

const updProd = 14
updateProduct(updProd, {
  tags: ["grocery", "berry"],
})

// Popularity Max Heap
console.log("Top trending:", trending.extract());

// Max Price
console.log("Max price: ", maxPrice.extract());

// Min Price
console.log("Min price: ", minPrice.extract());

// Product Relationship Graph
// Related products to products[prod]
const prod = 14
console.log(`related to products[${prod}]`, relGraph.findRelated(prod).getNodesToDepth(2));
