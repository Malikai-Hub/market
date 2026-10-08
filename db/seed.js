import db from "#db/client";
import { createUser } from "./queries/users.js";
import { createOrder } from "./queries/orders.js";
import { createProduct } from "./queries/products.js";
import { createProductOrder } from "./queries/odersProducts.js";
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user = await createUser("superstar", "loves2shop");
  for (let i = 1; i <= 10; i++) {
    await createProduct(
      "Product " + i,
      "Description " + i,
      Math.random() * 100,
    );
  }

  const order = await createOrder(user.id, "7777-07-07");
  for (let i = 1; i <= 5; i++) {
    await createProductOrder(order.id, i, i);
  }
}
