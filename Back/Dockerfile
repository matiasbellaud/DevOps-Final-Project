FROM node:18

#Répertoire de travail 
WORKDIR /app

#Copiez les fichiers Package-lock.json et package.json pour l'installation des dépendances
COPY package*.json ./

#Installation des dépendances
RUN npm install

#Copiez les fichiers vers le repertoire de travail /app
COPY . .

#Ajout du port
EXPOSE 5000

#Commande d'éxecution 
CMD ["node", "server.js"]