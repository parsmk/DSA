import { Product, products } from "./models";

// Graph
export class ProductGraph {
  private _graph: Record<number, Heap<[edge: number, weight: number]>> = {};

  constructor() {
    // O(dn^2) due to inner insert
    Object.values(products).forEach((p) => this.insert(p));
  }

  // Could add more heuristics here like PurchaseHistory too. Would have to loop through everything anyways
  private heuristicMethods(a: Product, b: Product) {
    const sharedTags = a.tags.filter((t) => b.tags.includes(t)).length;
    const popularityScore = 1 + (4 / a.popularity);

    return sharedTags + popularityScore;
  }

  private ensureNode(id: number) {
    if (!this._graph[id]) {
      this._graph[id] = new Heap<[number, number]>(
        "max",
        undefined,
        (entry) => entry[1]
      );
    }

    return this._graph[id];
  }

  insert(newProduct: Product) {
    this.ensureNode(newProduct.id);
    // O(dn) where d = number of tags. Though this scales it scales at a much reduced rate.
    for (const product of Object.values(products)) {
      const weight = this.heuristicMethods(newProduct, product);
      if (weight === 0) continue;

      this.ensureNode(product.id).insert([newProduct.id, weight]);
    }
  }

  update(prod: Product) {
    for (const product of Object.values(products)) {
      const weight = this.heuristicMethods(prod, product);
      if (weight === 0) continue;

      this.del(prod.id);
      this.ensureNode(prod.id).insert([product.id, weight]);
    }
  }

  del(id: number) {
    const node = this._graph[id];
    if (!node) return;

    for (const [edgeId, _] of node.getHeap()) {
      const neighbor = this._graph[edgeId];
      if (neighbor) {
        neighbor.getHeap().findIndex(e => e[0] === id);
        for (const e of neighbor.getHeap()) {
          if (e[0] !== id) continue;
          neighbor.del(e);
        }
      }
    }

    delete this._graph[id];
  }

  findRelated(id: number) {
    return this._graph[id];
  }
}

export class Heap<T> {
  private heap: T[];
  private compare: (a: T, b: T) => boolean;
  private keyFn: (x: T) => any; //should be number but needs a rework

  constructor(mode: "max" | "min", tIn?: T | T[], key?: (prop: T) => number) {
    this.keyFn = key ?? ((x) => x);
    this.heap = [];
    this.compare =
      mode === "max"
        ? (a, b) => this.keyFn(a) > this.keyFn(b)
        : (a, b) => this.keyFn(a) < this.keyFn(b);

    if (tIn) {
      tIn = Array.isArray(tIn) ? tIn : [tIn];
      tIn.forEach((t) => this.insert(t));
    }
  }

  insert(item: T): void {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.compare(this.heap[index], this.heap[parent])) {
        [this.heap[parent], this.heap[index]] = [
          this.heap[index],
          this.heap[parent],
        ];
        index = parent;
      } else break;
    }
  }

  private sinkDown(index: number): void {
    const n = this.heap.length;
    let largest = index;

    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left < n && this.compare(this.heap[left], this.heap[largest])) {
      largest = left;
    }

    if (right < n && this.compare(this.heap[right], this.heap[largest])) {
      largest = right;
    }

    if (largest !== index) {
      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];
      this.sinkDown(largest);
    }
  }

  del(key: T): boolean {
    const index = this.heap.findIndex((item) => this.keyFn(item) === this.keyFn(key));
    if (index === -1) return false;

    const last = this.heap.pop();
    if (index < this.heap.length && last !== undefined) {
      this.heap[index] = last;
      this.bubbleUp(index);
      this.sinkDown(index);
    }

    return true;
  }

  update(key: T, oldKey: T): boolean {
    this.del(oldKey)
    this.insert(key)

    return true;
  }

  find(key: T): T {
    const node = this.heap.find((item) => this.keyFn(item) === this.keyFn(key));
    if (!node) throw new Error("Heapkey not found!");
    return node;
  }

  getNodesToDepth(depth: number, currDepth = 0, index = 0, output: T[] = []) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (index >= this.heap.length || currDepth === depth) return output;

    output.push(this.heap[left]);
    output.push(this.heap[right]);

    this.getNodesToDepth(depth, currDepth + 1, left, output);
    this.getNodesToDepth(depth, currDepth + 1, right, output);

    if (currDepth === 0) {
      output.sort((a, b) => b[1] - a[1]);
    }

    return output;
  }

  extract(): T | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop() ?? null;

    const max = this.heap[0];
    this.heap[0] = this.heap.pop() as T;
    this.sinkDown(0);
    return max;
  }

  peek(): T | null {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size(): number {
    return this.heap.length;
  }

  getHeap(): T[] {
    return this.heap;
  }
}
