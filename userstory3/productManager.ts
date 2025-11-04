
interface IProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

// Enum for product categories
enum Category {
  ELECTRONICS = "Electronics",
  FASHION = "Fashion",
  GROCERY = "Grocery"
}

// Decorator to log changes
function LogChange(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalSetter = descriptor.set!;
  descriptor.set = function (this: any, value: number) {
    const fieldName = `_${propertyKey}`;
    const oldValue = this[fieldName] ?? 0;
    console.log(`🔔 ${propertyKey.toUpperCase()} changed: ${oldValue} → ${value}`);
    this[fieldName] = value;
    originalSetter.call(this, value);
  };
  return descriptor;
}

// Product class implementing interface
class Product implements IProduct {
  private _price: number;
  private _stock: number;

  constructor(
    public id: number,
    public name: string,
    public category: string,
    price: number,
    stock: number
  ) {
    this._price = price;
    this._stock = stock;
  }

  @LogChange
  set price(value: number) {
    this._price = value;
  }
  get price(): number {
    return this._price;
  }

  @LogChange
  set stock(value: number) {
    this._stock = value;
  }
  get stock(): number {
    return this._stock;
  }

  // Iterator for displaying product data
  *[Symbol.iterator]() {
    yield this.id;
    yield this.name;
    yield this.category;
    yield this.price;
    yield this.stock;
  }
}

// === DEMO INVENTORY USING ARRAY OF TUPLES ===
const inventory: [number, Product][] = [];

const laptop = new Product(101, "MacBook Pro", Category.ELECTRONICS, 2499.99, 10);
const tshirt = new Product(102, "T-Shirt", Category.FASHION, 799.99, 50);
const rice = new Product(103, "Rice Bag", Category.GROCERY, 1200, 25);

inventory.push([laptop.id, laptop], [tshirt.id, tshirt], [rice.id, rice]);

// Update values (trigger decorator)
laptop.price = 2299.99;
tshirt.stock = 45;

// === DISPLAY USING for...of + Iterator ===
console.log("\n=== INVENTORY REPORT ===");
for (const [id, product] of inventory) {
  console.log(`Product ID: ${id}`);
  for (const value of product) {
    console.log(`  → ${value}`);
  }
}
