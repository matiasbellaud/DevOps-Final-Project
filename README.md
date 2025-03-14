# Projet Final : Application Web Dockerisée avec CI/CD et Déploiement Cloud

## Noms des membres du trinôme
- FUZEAU Maxime
- GUILLET Evan
- BELLAUD Matias

## Description du projet
Ce projet consiste en la mise en œuvre d'une chaîne DevOps complète pour le déploiement d'une application web. L'application comprend un frontend (Express), un backend (Express) et une base de données (PostgreSQL), le tout containerisé avec Docker et orchestré via Docker Compose.

## Instructions de démarrage

### Localement
1. Cloner le repository :
    ```sh
    git clone https://github.com/giraud-d-edu/m3-devops-final-project-mem.git
    cd m3-devops-final-project-mem/
    ```

2. Lancer Docker Compose :
    ```sh
    docker-compose up --build
    ```

3. Accéder à l'application :
    - Frontend : [http://localhost:3000](http://localhost:3000)
    - Backend : [http://localhost:5000](http://localhost:5000)

## Liste des technologies utilisées
- Git et GitHub (gestion de version, pull requests)
- Docker et Docker Compose (contenairisation)
- Node.js
- Express
- PostgreSQL
- Jest et Lint

## Dockerisation complète de l'application
- Création de Dockerfiles pour le frontend, le backend et la base de données.
- Orchestration des services via Docker Compose.

## Tests et qualité de code
- Afin d'assuré la qualité du code nous avonc mis en place Lint (dépendance nodeJs) qui vérifie le code du back-end
    commande : `npm run lint`
- Test unitaire avec Jest
    commande : `npm test`

## Multi stage builds
Le projet utilise des Dockerfiles multi-stage pour construire des images Docker optimisées :

    Backend : 
    Le processus de build dans Docker installe les dépendances de développement, puis crée une image optimisée pour la production, avec uniquement les dépendances nécessaires.

    Frontend : 
    Le processus de build compile le frontend (React ou autre) dans un premier stage, puis utilise une image légère de nginx pour servir les fichiers statiques dans un deuxième stage.

## Gestion sécurisée des secrets
- Utilisation de variables d'environnement (.env) pour les configurations sensibles.
- Stockage sécurisé des secrets (variables d'environnement du PaaS).
