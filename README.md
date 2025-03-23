# TP 4 - Application Ecommerce

Vous retrouverez dans ce dépot le code source pour la partie frontend et backend. Vous retrouverez dans backend/model.sql le schéma SQL de la base de données afin de pouvoir l'initialiser facilement.

## Prérequis
- NodeJS
- Serveur MySQL
- Git (pour cloner le projet)

## Stack technique

Frontend: NodeJS, ViteJS, React, Typescript
Backend: NodeJS, ExpressJS

## Installation
Ce projet est a installer sur une machine virtuelle (VM) ou un VPS. Dans le cas d'Azure, il est préférable de prendre une machine virtuelle

Il est recommandé d'installer le projet dans /var/www/

### Configuration de Git
Il est nécessaire de configurer Git avant de pouvoir cloner le dépot, car il est privé.
- Générer une clé SSH
(Remplacez "votre_email@example.com" par l'adresse mail associée à votre compte Github)
```bash
ssh-keygen -t rsa -b 4096 -C "votre_email@example.com"
```
- Ajouter la clé SSH à l'agent pour qu'elle soit reconnue
```bash
ssh-add ~/.ssh/id_rsa
```
- Copiez le contenu de la clé pour l'ajouter dans le compte Github
```bash
cat ~/.ssh/id_rsa.pub
```
- Rendez-vous sur votre compte Github à l'adresse [https://github.com/settings/ssh/new](https://github.com/settings/ssh/new) et collez le contenu

- Se déplacer vers /var/www/

- Cloner le dépot Github
```bash
git clone git@github.com:Certurix/ecommerce-app.git
cd ecommerce-app
```

- Configurer la base de données MySQL
```bash
mysql -u root -p
```

- Executez le script SQL
```
SOURCE backend/model.sql;
```

- Copiez le fichier de variables d'environnement pour le backend
- cp backend/.env.example backend/.env
  
- Accédez au fichier .env et modifiez le pour saisir la configuration MySQL
```bash
DB_NAME=ecommerce
DB_USER=ecommerce_user
DB_PASSWORD=123456789
DB_HOST=localhost
DB_DIALECT=mysql
```

- Installer les dépendances du backend
```bash
cd backend
npm install
cd ..
```
- Et pour le frontend
```bash
cd frontend
npm install
cd ..
```

- En étant dans la racine du projet (/var/www/ecommerce-app), vous pouvez démarrer directement le frontend et le backend en simultané.
```bash
npm install
npm run start
```