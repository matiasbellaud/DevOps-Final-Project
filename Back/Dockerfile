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

# Sécurisation du conteneur
# 1. Création d'un groupe 'appgroup' (-S pour ne pas créer de mot de passe)
RUN addgroup -S appgroup 
# 2. Création d'un utilisateur 'appuser' sans mot de passe (-S) et l'ajoute au groupe 'appgroup'
RUN adduser -S appuser -G appgroup
# 3. Passage à l'utilisateur 'appuser' pour éviter d'exécuter le conteneur en root
USER appuser

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers nécessaires depuis l'étape de build
COPY --from=builder /app .

# Ajout du port 5000
EXPOSE 5000

# Commande d'éxecution 
CMD ["node", "server.js"]