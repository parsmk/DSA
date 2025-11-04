// Simple product store using dictionary for O(1) lookups
// Pros: Constant Time Complexity --> lookups, adding, deleting
// Cons: Creating relationships, cannot create structure relationships
// Use case: Core inventory
import { Heap, ProductGraph } from "./DS";
import { products, Product } from "./models";

const graph = new ProductGraph();
const trending = new Heap<Product>(
  "max",
  Object.values(products),
  (p) => p.popularity
);

// CRUD operations
function addProduct(product: Product) {
  let id = Object.keys(products).length;
  if (Object.keys(products).length in products) {
    while (id in products) id--;
  }

  graph.insert(product);
  trending.insert(product);
  products[product.id] = product;
}

function updateProduct(id: number, updates: Product) {
  if (!products[id]) {
    return false;
  }

  if (products[id].tags !== updates.tags) graph.update(products[id]);
  products[id] = { ...products[id], ...updates };
}

function deleteProduct(id: number) {
  delete products[id];
}

function searchProductByName(name: string) {
  // Time Complexity: O(n)
  return Object.values(products).filter(
    (p) => p.name.toLowerCase().includes(name.toLowerCase()) // case --> case, phone case, phonecase
  );
}

// Popularity Max Heap
console.log("Top trending:", trending.extractMax());

// Product Relationship Graph
console.log("Graph", graph.findRelated(1).getHeap());
