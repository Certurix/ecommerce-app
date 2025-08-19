CREATE DATABASE ecommerce;
USE ecommerce;

CREATE USER 'ecommerce_user'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456789';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'ecommerce_user'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL UNIQUE
);

INSERT IGNORE INTO `categories` (`id`, `nom`) VALUES (1, 'Montres hommes');
INSERT IGNORE INTO `categories` (`id`, `nom`) VALUES (2, 'Montres femmes');
INSERT IGNORE INTO `categories` (`id`, `nom`) VALUES (3, 'Montres enfants');
INSERT IGNORE INTO `categories` (`id`, `nom`) VALUES (4, 'Montres connectées');

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

INSERT IGNORE INTO `produits` (`id`, `reference`, `nom`, `description`, `prix`, `stock`, `categorie_id`, `image_url`) VALUES (1, 'REF-H1-001', 'Montre de luxe homme', 'Une montre adaptée pour le business', 299.99, 28, 1, 'https://images.unsplash.com/photo-1623998021450-85c29c644e0d');
INSERT IGNORE INTO `produits` (`id`, `reference`, `nom`, `description`, `prix`, `stock`, `categorie_id`, `image_url`) VALUES (2, 'REF-W1-001', 'Montre élégante femme', 'Une montre adaptée pour les femmes', 149.99, 4, 2, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30');
INSERT IGNORE INTO `produits` (`id`, `reference`, `nom`, `description`, `prix`, `stock`, `categorie_id`, `image_url`) VALUES (3, 'REF-K1-001', 'Montre enfant', 'Une montre adaptée pour les enfants', 69.99, 14, 3, 'montre-enfant.jpg');

CREATE TABLE commandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    statut ENUM('En attente', 'Payée', 'Expédiée', 'Livrée', 'Annulée') DEFAULT 'En attente',
    date_commande TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    adresse VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
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