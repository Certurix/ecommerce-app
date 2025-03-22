CREATE DATABASE ecommerce;
USE ecommerce;

CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecommerce_user'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE produits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reference VARCHAR(50) NOT NULL UNIQUE,
    nom VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    prix DECIMAL(10,2) NOT NULL CHECK (prix > 0),
    stock INT NOT NULL CHECK (stock >= 0),
    image_url VARCHAR(255),
    categorie_id INT,
    FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE commandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_nom VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    statut ENUM('En attente', 'Payée', 'Expédiée', 'Livrée', 'Annulée') DEFAULT 'En attente',
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE details_commande (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commande_id INT NOT NULL,
    produit_id INT NOT NULL,
    quantite INT NOT NULL CHECK (quantite > 0),
    prix_unitaire DECIMAL(10,2) NOT NULL CHECK (prix_unitaire >= 0),
    FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
    FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE CASCADE
);

CREATE TABLE historique_commandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    commande_id INT NOT NULL,
    statut VARCHAR(50) NOT NULL,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE
);