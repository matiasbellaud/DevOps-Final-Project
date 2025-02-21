const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000; // Tu peux choisir un autre port si besoin

// Servir les fichiers statiques (HTML, CSS, JS) depuis le dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route principale pour servir le fichier HTML (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur front-end est en cours d'exécution sur http://localhost:${PORT}`);
});
