# Étape 1 : Construction de l’application
FROM node:18 AS builder

#Répertoire de travail 
WORKDIR /app

#Copiez les fichiers Package-lock.json et package.json pour l'installation des dépendances
COPY package*.json ./

# Installation des dépendances uniquement pour la production et nettoyage du cache
RUN npm install --only=production && npm cache clean --force

#Copiez les fichiers vers le repertoire de travail /app
COPY . .

# Étape 2 : Image de production : une image plus légère
# alpine est une version allégée de node
FROM node:18-alpine

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers depuis l’étape de build
COPY --from=builder /app .  

# Le conteneur utilise le port 3000
EXPOSE 3000

# Commande par défaut exécutée lors du démarrage du conteneur
CMD ["node", "server-front.js"]