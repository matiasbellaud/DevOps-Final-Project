const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Initialiser l'application Express
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());  // Pour parser le corps des requêtes en JSON

// Chemin vers le fichier de base de données SQLite (le fichier .db)
const dbPath = path.join(__dirname, 'projetDB.db');

// Créer une base de données SQLite ou ouvrir une base existante
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur lors de la création/connexion à la base de données SQLite :', err);
  } else {
    console.log('Connexion à la base de données SQLite réussie');
  }
});

// Fonction pour initialiser la base de données et créer la table si elle n'existe pas
function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table :', err);
    } else {
      console.log('Table "items" créée avec succès (ou déjà existante)');
    }
  });
}

// Initialiser la base de données au démarrage du serveur
initializeDatabase();

// Route pour ajouter un élément dans la base de données
app.post('/api/items', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Le nom de l\'élément est requis' });
  }

  const query = 'INSERT INTO items (name) VALUES (?)';
  db.run(query, [name], function (err) {
    if (err) {
      console.error('Erreur lors de l\'ajout de l\'élément :', err);
      return res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'élément' });
    }

    res.json({ id: this.lastID, name });
  });
});

// Route pour récupérer tous les éléments de la base de données
app.get('/api/items', (req, res) => {
    const query = 'SELECT * FROM items';
  
    db.all(query, (err, rows) => {
      if (err) {
        console.error('Erreur lors de la récupération des éléments :', err);
        return res.status(500).json({ message: 'Erreur lors de la récupération des éléments' });
      }
  
      // Renvoie la liste des éléments
      res.json(rows);
    });
  });
  

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
