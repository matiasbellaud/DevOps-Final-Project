# Image officielle Node.js version 18
FROM node:18

# Définit le répertoire de travail dans le conteneur
WORKDIR /app

# Copie tous les fichiers du projet dans le conteneur
COPY . .

# Installe les dépendances du projet
RUN npm install

# Le conteneur utilise le port 3000
EXPOSE 3000

# Commande par défaut exécutée lors du démarrage du conteneur
CMD ["node", "server-front.js"]