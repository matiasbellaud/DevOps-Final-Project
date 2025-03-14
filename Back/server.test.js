const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: "admin",
  host: "localhost",
  database: "projetdb",
  password: "admin",
  port: 5432,
});

jest.mock("pg", () => {
  const mPool = {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

// Route pour ajouter un élément
app.post("/api/items", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Le nom de l'élément est requis" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO items (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erreur lors de l'ajout de l'élément :", err);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'élément" });
  }
});

// Route pour récupérer les éléments
app.get("/api/items", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM items");
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des éléments :", err);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des éléments" });
  }
});

describe("API /api/items", () => {
  it("should add a new item", async () => {
    const newItem = { name: "Test Item" };
    pool.query.mockResolvedValueOnce({ rows: [newItem] });

    const response = await request(app).post("/api/items").send(newItem);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(newItem);
  });

  it("should return 400 if item name is missing", async () => {
    const response = await request(app).post("/api/items").send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Le nom de l'élément est requis");
  });

  it("should get all items", async () => {
    const items = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];
    pool.query.mockResolvedValueOnce({ rows: items });

    const response = await request(app).get("/api/items");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(items);
  });
});
