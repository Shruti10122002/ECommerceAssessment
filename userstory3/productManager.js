var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Enum for product categories
var Category;
(function (Category) {
    Category["ELECTRONICS"] = "Electronics";
    Category["FASHION"] = "Fashion";
    Category["GROCERY"] = "Grocery";
})(Category || (Category = {}));
// Decorator to log changes
function LogChange(target, propertyKey, descriptor) {
    const originalSetter = descriptor.set;
    descriptor.set = function (value) {
        var _a;
        const fieldName = `_${propertyKey}`;
        const oldValue = (_a = this[fieldName]) !== null && _a !== void 0 ? _a : 0;
        console.log(`🔔 ${propertyKey.toUpperCase()} changed: ${oldValue} → ${value}`);
        this[fieldName] = value;
        originalSetter.call(this, value);
    };
    return descriptor;
}
// Product class implementing interface
class Product {
    constructor(id, name, category, price, stock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this._price = price;
        this._stock = stock;
    }
    set price(value) {
        this._price = value;
    }
    get price() {
        return this._price;
    }
    set stock(value) {
        this._stock = value;
    }
    get stock() {
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
__decorate([
    LogChange
], Product.prototype, "price", null);
__decorate([
    LogChange
], Product.prototype, "stock", null);
// === DEMO INVENTORY USING ARRAY OF TUPLES ===
const inventory = [];
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
