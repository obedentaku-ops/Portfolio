-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 09 déc. 2025 à 15:10
-- Version du serveur : 8.0.41
-- Version de PHP : 8.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cinema`
--

-- --------------------------------------------------------

--
-- Structure de la table `acteurs`
--

CREATE TABLE `acteurs` (
  `id_acteur` int NOT NULL,
  `nom` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `date_naissance` date NOT NULL,
  `nb_film` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `acteurs`
--

INSERT INTO `acteurs` (`id_acteur`, `nom`, `prenom`, `date_naissance`, `nb_film`) VALUES
(1, 'Johnson', 'Dwayne', '1979-10-09', 50),
(2, 'Idriss', 'Damson', '1996-03-15', 12),
(3, 'Washington', 'Denzel', '1952-08-19', 89),
(4, 'Pitt', 'Brad', '1976-09-17', 65),
(5, 'Smith', 'Will', '1975-04-01', 33),
(6, 'Sy', 'Omar', '1984-09-26', 11),
(7, 'DiCaprio', 'Leonardo', '1977-12-09', 40),
(8, 'Freeman', 'Morgan', '1937-07-13', 63);

-- --------------------------------------------------------

--
-- Structure de la table `casting`
--

CREATE TABLE `casting` (
  `id_film` int NOT NULL,
  `id_acteur` int NOT NULL,
  `role` varchar(30) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `casting`
--

INSERT INTO `casting` (`id_film`, `id_acteur`, `role`) VALUES
(1, 2, 'Conducteur F1'),
(1, 4, 'Conducteur F1');

-- --------------------------------------------------------

--
-- Structure de la table `film`
--

CREATE TABLE `film` (
  `id_film` int NOT NULL,
  `titre` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `genre` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `date_sortie` date NOT NULL,
  `id_pays` int NOT NULL,
  `id_realisateur` int NOT NULL,
  `distributeur` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `duree` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `film`
--

INSERT INTO `film` (`id_film`, `titre`, `genre`, `date_sortie`, `id_pays`, `id_realisateur`, `distributeur`, `duree`) VALUES
(1, 'F1', 'Mixte', '2025-10-08', 2, 1, 'Warner Bros. Pictures', 90),
(2, 'The Equalizer', 'Mixte', '2014-09-02', 1, 2, 'Sony Pictures Entertainement', 138);

-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

CREATE TABLE `pays` (
  `id_pays` int NOT NULL,
  `libelle` varchar(30) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pays`
--

INSERT INTO `pays` (`id_pays`, `libelle`) VALUES
(1, 'France '),
(2, 'Etats-Unis');

-- --------------------------------------------------------

--
-- Structure de la table `realisateurs`
--

CREATE TABLE `realisateurs` (
  `id_realisateur` int NOT NULL,
  `nom` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `date_naissance` date NOT NULL,
  `nb_film_ecrit` int NOT NULL,
  `nb_film_produit` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `realisateurs`
--

INSERT INTO `realisateurs` (`id_realisateur`, `nom`, `prenom`, `date_naissance`, `nb_film_ecrit`, `nb_film_produit`) VALUES
(1, 'Kosinski', 'Joseph', '1975-08-19', 62, 62),
(2, 'Fuqua', 'Antoine', '1965-05-30', 14, 14);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `acteurs`
--
ALTER TABLE `acteurs`
  ADD PRIMARY KEY (`id_acteur`);

--
-- Index pour la table `casting`
--
ALTER TABLE `casting`
  ADD KEY `id_film` (`id_film`,`id_acteur`),
  ADD KEY `id_acteur` (`id_acteur`);

--
-- Index pour la table `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`id_film`),
  ADD KEY `id_realisateur` (`id_realisateur`),
  ADD KEY `id_pays` (`id_pays`);

--
-- Index pour la table `pays`
--
ALTER TABLE `pays`
  ADD PRIMARY KEY (`id_pays`);

--
-- Index pour la table `realisateurs`
--
ALTER TABLE `realisateurs`
  ADD PRIMARY KEY (`id_realisateur`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `casting`
--
ALTER TABLE `casting`
  ADD CONSTRAINT `casting_ibfk_1` FOREIGN KEY (`id_acteur`) REFERENCES `acteurs` (`id_acteur`),
  ADD CONSTRAINT `casting_ibfk_2` FOREIGN KEY (`id_film`) REFERENCES `film` (`id_film`);

--
-- Contraintes pour la table `film`
--
ALTER TABLE `film`
  ADD CONSTRAINT `film_ibfk_1` FOREIGN KEY (`id_realisateur`) REFERENCES `realisateurs` (`id_realisateur`),
  ADD CONSTRAINT `film_ibfk_2` FOREIGN KEY (`id_pays`) REFERENCES `pays` (`id_pays`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
