import db from "#db/client";

export async function createProduct({ id, title, description, price }) {
  const sql =
    "INSERT INTO products(id, title, description, price) VALUES ($1, $2, $3, $4) RETURNING *";
  const {
    rows: [products],
  } = await db.query(sql, [id, title, description, price]);
  return products;
}

export async function getProducts() {
  const sql = "SELECT * FROM products";
  const { rows: products } = await db.query(sql);
  return products;
}

export async function getProductsById(id) {
  const sql = "SELECT * FROM products WHERE id = $1";
  const {
    rows: [products],
  } = await db.query(sql, [id]);
  return products;
}

export async function getProductsByOrderId(id) {
  const sql =
    "SELECT products.* FROM products JOIN orders_products ON products.id = orders_products.product_id WHERE orders_products.order = $1 ";
  const { rows: products } = await db.query(sql, [id]);
  return products;
}
