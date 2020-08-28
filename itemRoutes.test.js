process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("./app");
let items = require("./fakeDb");


let item = {name:"popsicle", price: 1.45}

beforeEach(function () {
items.push(item);
});

afterEach(function () {
    items.length = 0;
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ items: [{name:"popsicle", price: 1.45}] })
  })
})

describe("GET /items/:name", () => {
  test("Get items by name", async () => {
    const res = await request(app).get(`/items/${item.name}`);
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ item: {name:"popsicle", price: 1.45} })
  })
  test("Responds with 404 for invalid item", async () => {
    const res = await request(app).get(`/items/icecube`);
    expect(res.statusCode).toBe(404)
  })
})

describe("POST /items", () => {
  test("Creating a item", async () => {
    const res = await request(app).post("/items").send({ name: "snickers", price: 1.25 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ added: { name: "snickers", price: 1.25 } });
  })

  test("Responds with 400 if name is missing", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toBe(400);
  })
 })

describe("/PATCH /items/:name", () => {
  test("Updating a item's name", async () => {
    const res = await request(app).patch(`/items/${item.name}`).send({ name: "Monster", price:0.99 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "Monster", price:0.99 } });
  })
  test("Responds with 404 for invalid name", async () => {
    const res = await request(app).patch(`/items/skittles`).send({ name: "Monster" });
    expect(res.statusCode).toBe(404);
  })
})

describe("/DELETE /items/:name", () => {
  test("Deleting an item", async () => {
    const res = await request(app).delete(`/items/${item.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' })
  })
  test("Responds with 404 for deleting invalid item", async () => {
    const res = await request(app).delete(`/items/burger`);
    expect(res.statusCode).toBe(404);
  })
})

