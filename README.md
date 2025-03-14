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

2. Créer un fichier `.env` dans le dossier `Back` en se basant sur `.env.example` :
    ```sh
    cp Back/.env.example Back/.env
    ```

3. Lancer Docker Compose :
    ```sh
    docker-compose up --build
    ```

4. Accéder à l'application :
    - Frontend : [http://localhost:3000](http://localhost:3000)
    - Backend : [http://localhost:5000](http://localhost:5000)

## Liste des technologies utilisées
- Git et GitHub (gestion de version, pull requests)
- Docker et Docker Compose (containerisation)
- Node.js
- Express
- PostgreSQL

## Dockerisation complète de l'application
- Création de Dockerfiles pour le frontend, le backend et la base de données.
- Orchestration des services via Docker Compose.

## Gestion sécurisée des secrets
- Utilisation de variables d'environnement (.env) pour les configurations sensibles.
- Stockage sécurisé des secrets (ex: Docker Secrets, variables d'environnement du PaaS).
