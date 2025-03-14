const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Charger les variables d'environnement

// Initialiser l'application Express
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || "admin",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "projetdb",
  password: process.env.DB_PASSWORD || "admin",
  port: 5432,
});

// Fonction pour initialiser la base de données avec réessai
async function initializeDatabaseWithRetry(retries = 10, delay = 10000) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS items (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL
        );
      `);
      console.log('Table "items" prête');
      return;
    } catch (err) {
      console.error(
        `Erreur lors de la création de la table (tentative ${
          i + 1
        }/${retries}):`,
        err
      );
      if (i < retries - 1) {
        console.log(`Nouvelle tentative dans ${delay / 1000} secondes...`);
        await new Promise((res) => setTimeout(res, delay));
      } else {
        console.error(
          "Échec de la connexion à la base de données après plusieurs tentatives."
        );
        process.exit(1);
      }
    }
  }
}

// Initialiser la base de données au démarrage du serveur
initializeDatabaseWithRetry();

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

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
