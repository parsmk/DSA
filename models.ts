export type Tags =
  | "electronic" // Electronics
  | "phone"
  | "laptop"
  | "desktop"
  | "tablet"
  | "accessory" // Accessories
  | "phone case"
  | "tablet case"
  | "laptop bag"
  | "bag"
  | "screen protector"
  | "charger"
  | "grocery" // Groceries
  | "fruit"
  | "bulk"
  | "can";

export type Product = {
  id: number;
  name: string;
  tags: Tags[];
  price: number;
  quantity: number;
  popularity: number;
};

export const products: Record<number, Product> = {
  1: {
    id: 1,
    name: "Laptop",
    tags: ["electronic", "laptop"],
    price: 1000,
    quantity: 5,
    popularity: 50,
  },
  2: {
    id: 2,
    name: "Phone",
    tags: ["electronic", "phone"],
    price: 800,
    quantity: 10,
    popularity: 100,
  },
  3: {
    id: 3,
    name: "Phone Case",
    tags: ["accessory", "phone case", "phone", "electronic"],
    price: 20,
    quantity: 50,
    popularity: 20,
  },
  4: {
    id: 4,
    name: "Charger",
    tags: ["accessory", "charger", "phone", "electronic"],
    price: 25,
    quantity: 30,
    popularity: 70,
  },
  5: {
    id: 5,
    name: "Tablet",
    tags: ["electronic", "tablet"],
    price: 600,
    quantity: 8,
    popularity: 60,
  },
  6: {
    id: 6,
    name: "Tablet Case",
    tags: ["accessory", "tablet case", "tablet"],
    price: 25,
    quantity: 40,
    popularity: 35,
  },
  7: {
    id: 7,
    name: "Laptop Bag",
    tags: ["accessory", "laptop bag", "bag"],
    price: 45,
    quantity: 25,
    popularity: 55,
  },
  8: {
    id: 8,
    name: "Screen Protector",
    tags: ["accessory", "screen protector", "phone"],
    price: 15,
    quantity: 60,
    popularity: 45,
  },
  9: {
    id: 9,
    name: "Desktop PC",
    tags: ["electronic", "desktop"],
    price: 1200,
    quantity: 4,
    popularity: 65,
  },
  10: {
    id: 10,
    name: "Wireless Mouse",
    tags: ["accessory", "laptop"],
    price: 30,
    quantity: 35,
    popularity: 75,
  },
  11: {
    id: 11,
    name: "Keyboard",
    tags: ["accessory", "desktop"],
    price: 40,
    quantity: 30,
    popularity: 50,
  },
  12: {
    id: 12,
    name: "Bag of Apples",
    tags: ["grocery", "fruit", "bulk"],
    price: 10,
    quantity: 80,
    popularity: 40,
  },
  13: {
    id: 13,
    name: "Canned Beans",
    tags: ["grocery", "can"],
    price: 5,
    quantity: 100,
    popularity: 30,
  },
  14: {
    id: 14,
    name: "Bananas",
    tags: ["grocery", "fruit"],
    price: 3,
    quantity: 90,
    popularity: 65,
  },
  15: {
    id: 15,
    name: "Bulk Rice",
    tags: ["grocery", "bulk"],
    price: 20,
    quantity: 60,
    popularity: 55,
  },
  16: {
    id: 16,
    name: "Bluetooth Earbuds",
    tags: ["electronic", "accessory", "phone"],
    price: 75,
    quantity: 20,
    popularity: 85,
  },
  17: {
    id: 17,
    name: "Smartwatch",
    tags: ["electronic", "accessory", "phone"],
    price: 200,
    quantity: 15,
    popularity: 95,
  },
  18: {
    id: 18,
    name: "HDMI Cable",
    tags: ["accessory", "electronic"],
    price: 12,
    quantity: 50,
    popularity: 25,
  },
  19: {
    id: 19,
    name: "Portable Power Bank",
    tags: ["accessory", "charger", "electronic"],
    price: 50,
    quantity: 25,
    popularity: 80,
  },
  20: {
    id: 20,
    name: "Wireless Tablet Keyboard",
    tags: ["accessory", "tablet", "electronic"],
    price: 55,
    quantity: 18,
    popularity: 60,
  },
};
