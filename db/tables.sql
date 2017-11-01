-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Client :  localhost:3306
-- Généré le :  Mer 01 Novembre 2017 à 14:27
-- Version du serveur :  10.1.25-MariaDB-1
-- Version de PHP :  7.1.8-1ubuntu1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `lesitedelassurance`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `category_Id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `category`
--

INSERT INTO `category` (`category_Id`, `category_name`) VALUES
(1, 'RDV'),
(2, 'Meeting'),
(3, 'Congés'),
(4, 'Férié'),
(5, 'Message');

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

CREATE TABLE `contact` (
  `contact_Id` int(11) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `tel` varchar(255) NOT NULL,
  `date_creation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `devis`
--

CREATE TABLE `devis` (
  `devis_Id` int(11) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `tel` text NOT NULL,
  `birth_date` date NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `insurance_type` varchar(255) NOT NULL,
  `hospitalisation` smallint(6) DEFAULT NULL,
  `optique` smallint(6) DEFAULT NULL,
  `dentaire` smallint(6) DEFAULT NULL,
  `medecine` smallint(6) DEFAULT NULL,
  `assure_actuellement` smallint(6) DEFAULT NULL,
  `bonus` smallint(6) DEFAULT NULL,
  `garantie_souhaite` varchar(255) DEFAULT NULL,
  `residence_principale` smallint(6) DEFAULT NULL,
  `habitation_actuelle` varchar(255) DEFAULT NULL,
  `nb_pieces` smallint(6) DEFAULT NULL,
  `assurance_deces` smallint(6) DEFAULT NULL,
  `accident_vie` smallint(6) DEFAULT NULL,
  `date_creation` datetime DEFAULT NULL,
  `pros_part` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `devis`
--

INSERT INTO `devis` (`devis_Id`, `lastname`, `firstname`, `tel`, `birth_date`, `postal_code`, `city`, `email`, `insurance_type`, `hospitalisation`, `optique`, `dentaire`, `medecine`, `assure_actuellement`, `bonus`, `garantie_souhaite`, `residence_principale`, `habitation_actuelle`, `nb_pieces`, `assurance_deces`, `accident_vie`, `date_creation`, `pros_part`) VALUES
(259, 'nrasute', 'narusite', '02-12-12-12-12', '2017-12-10', '95100', 'Argenteuil', 'narsut@narusi.nrs', 'auto', NULL, NULL, NULL, NULL, 1, 2, 'simple', NULL, NULL, NULL, NULL, NULL, '2017-10-31 13:57:28', 'Particulier'),
(260, 'nrasute', 'narusite', '06-51-59-62-91', '2017-10-22', '95100', 'Argenteuil', 'narsut@narusi.nrs', 'auto', NULL, NULL, NULL, NULL, 1, 2, 'simple', NULL, NULL, NULL, NULL, NULL, '2017-10-31 14:17:04', 'Particulier'),
(261, 'nrasute', 'narusite', '01-21-32-12-32', '2017-11-16', '75000', 'Paris', 'test@test.tst', 'sante', 4, 3, 3, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2017-11-01 14:24:40', 'Particulier'),
(262, 'nrasute', 'narusite', '01-21-32-12-32', '2017-11-16', '75000', 'Paris', 'test@test.tst', 'auto', NULL, NULL, NULL, NULL, 1, 2, 'simple', NULL, NULL, NULL, NULL, NULL, '2017-11-01 14:25:07', 'Particulier'),
(263, 'nrasute', 'narusite', '01-21-32-12-32', '2017-11-16', '75000', 'Paris', 'test@test.tst', 'auto', NULL, NULL, NULL, NULL, 1, 2, 'simple', NULL, NULL, NULL, NULL, NULL, '2017-11-01 14:25:17', 'Particulier'),
(264, 'nrasute', 'narusite', '01-21-32-12-32', '2017-11-16', '75000', 'Paris', 'test@test.tst', 'pret', NULL, NULL, NULL, NULL, 1, NULL, NULL, 2, NULL, NULL, NULL, NULL, '2017-11-01 14:25:27', 'Particulier'),
(265, 'nrasute', 'narusite', '01-21-32-12-32', '2017-11-16', '75000', 'Paris', 'test@test.tst', 'habitation', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'appartement', 6, NULL, NULL, '2017-11-01 14:25:43', 'Particulier'),
(266, 'nrasute', 'narusite', '01-21-32-12-32', '2017-11-16', '75000', 'Paris', 'test@test.tst', 'prevoyance', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 2, '2017-11-01 14:25:55', 'Particulier');

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

CREATE TABLE `event` (
  `event_Id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Sans titre',
  `start` datetime NOT NULL,
  `end` datetime DEFAULT NULL,
  `comment` text COLLATE utf8_unicode_ci,
  `allday` smallint(4) DEFAULT '1',
  `color` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'blue',
  `recurrence` smallint(4) DEFAULT '1',
  `date_end_rec` datetime DEFAULT NULL,
  `available` smallint(4) DEFAULT '1',
  `days_rec` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `event_interval` smallint(6) DEFAULT NULL,
  `end_rec_type` smallint(4) DEFAULT '1',
  `last_modif` datetime DEFAULT NULL,
  `date_creation` datetime NOT NULL,
  `user_Id` int(6) NOT NULL,
  `start_end_diff` smallint(6) NOT NULL DEFAULT '0',
  `category_Id` int(11) NOT NULL DEFAULT '1',
  `visibility_Id` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `event`
--

INSERT INTO `event` (`event_Id`, `title`, `start`, `end`, `comment`, `allday`, `color`, `recurrence`, `date_end_rec`, `available`, `days_rec`, `event_interval`, `end_rec_type`, `last_modif`, `date_creation`, `user_Id`, `start_end_diff`, `category_Id`, `visibility_Id`) VALUES
(676, 'RDV pris par partenaire partenaire', '2017-10-30 08:00:00', '2017-10-30 09:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:27:45', 21, 0, 1, 1),
(677, 'RDV pris par partenaire partenaire', '2017-10-30 09:00:00', '2017-10-30 10:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:28:22', 21, 0, 1, 1),
(678, 'RDV pris par partenaire partenaire', '2017-10-30 11:00:00', '2017-10-30 12:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:28:55', 21, 0, 1, 1),
(679, 'RDV pris par partenaire partenaire', '2017-10-30 09:00:00', '2017-10-30 10:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:29:02', 21, 0, 1, 1),
(680, 'RDV pris par partenaire partenaire', '2017-10-30 12:00:00', '2017-10-30 13:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:29:05', 21, 0, 1, 1),
(681, 'RDV pris par partenaire partenaire', '2017-10-30 13:00:00', '2017-10-30 14:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:29:08', 21, 0, 1, 1),
(682, 'RDV pris par partenaire partenaire', '2017-10-30 17:00:00', '2017-10-30 18:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:29:10', 21, 0, 1, 1),
(683, 'RDV pris par partenaire partenaire', '2017-10-31 14:00:00', '2017-10-31 15:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:29:13', 21, 0, 1, 1),
(684, 'RDV pris par partenaire partenaire', '2017-11-01 13:00:00', '2017-11-01 14:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:29:16', 21, 0, 1, 1),
(685, 'RDV pris par partenaire partenaire', '2017-11-04 12:00:00', '2017-11-04 13:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:29:18', 21, 0, 1, 1),
(686, 'RDV pris par partenaire partenaire', '2017-11-04 09:00:00', '2017-11-04 10:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:29:22', 21, 0, 1, 1),
(687, 'RDV pris par partenaire partenaire', '2017-10-31 09:00:00', '2017-10-31 10:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:29:43', 21, 0, 1, 1),
(688, 'RDV pris par partenaire partenaire', '2017-11-02 14:00:00', '2017-11-02 15:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:29:46', 21, 0, 1, 1),
(689, 'RDV pris par partenaire partenaire', '2017-11-03 15:00:00', '2017-11-03 16:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:29:48', 21, 0, 1, 1),
(690, 'RDV pris par partenaire partenaire', '2017-11-02 17:00:00', '2017-11-02 18:00:00', NULL, 1, 'blue', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:29:51', 21, 0, 1, 1),
(691, 'Sans titre', '2017-10-03 07:31:00', '2017-10-07 18:31:00', 'Sans commentaire', 1, 'red', 1, NULL, 1, NULL, NULL, 1, NULL, '2017-10-30 20:31:52', 1, 4, 2, 1),
(692, 'Sans titre', '2017-10-09 09:32:00', '2017-10-09 18:32:00', 'Sans commentaire', 1, 'maroon', 2, '2017-10-19 23:59:59', 1, NULL, 3, 3, NULL, '2017-10-30 20:32:54', 1, 0, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `rdv`
--

CREATE TABLE `rdv` (
  `rdv_Id` int(11) NOT NULL,
  `rdv_object_Id` int(250) DEFAULT NULL,
  `event_Id` int(11) NOT NULL,
  `rdv_removed` smallint(6) NOT NULL DEFAULT '1',
  `client_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `client_first_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `client_email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `client_tel` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `rdv_status_Id` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `rdv`
--

INSERT INTO `rdv` (`rdv_Id`, `rdv_object_Id`, `event_Id`, `rdv_removed`, `client_name`, `client_first_name`, `client_email`, `client_tel`, `rdv_status_Id`) VALUES
(20, 1, 676, 1, 'Durand', 'Paul', 'pauldurand@gmail.com', '0121121221', 1),
(21, 1, 677, 1, 'Dupont', 'Pascal', 'pascaldupont@gmail.com', '0121121221', 1),
(22, 1, 678, 1, 'Doe', 'John', 'johndoe@gmail.com', '0121121221', 1),
(23, 1, 679, 1, 'Doe', 'John', 'johndoe@gmail.com', '0121121221', 1),
(24, 1, 680, 1, 'Doe', 'John', 'johndoe@gmail.com', '0121121221', 1),
(25, 1, 681, 1, 'Doe', 'John', 'johndoe@gmail.com', '0121121221', 1),
(26, 1, 682, 1, 'Doe', 'John', 'johndoe@gmail.com', '0121121221', 5),
(27, 1, 683, 1, 'Doe', 'John', 'johndoe@gmail.com', '0121121221', 1),
(28, 1, 684, 1, 'Doe', 'John', 'johndoe@gmail.com', '0121121221', 4),
(29, 1, 685, 1, 'Doe', 'John', 'johndoe@gmail.com', '0121121221', 2),
(30, 1, 686, 1, 'Doe', 'John', 'johndoe@gmail.com', '0121121221', 2),
(31, 1, 687, 1, 'Paul ', 'Dupont', 'pauldupont@gmail.com', '0121121221', 4),
(32, 1, 688, 1, 'Paul ', 'Dupont', 'pauldupont@gmail.com', '0121121221', 2),
(33, 1, 689, 1, 'Paul ', 'Dupont', 'pauldupont@gmail.com', '0121121221', 1),
(34, 1, 690, 1, 'Paul ', 'Dupont', 'pauldupont@gmail.com', '0121121221', 1);

-- --------------------------------------------------------

--
-- Structure de la table `rdv_object`
--

CREATE TABLE `rdv_object` (
  `rdv_object_Id` int(11) NOT NULL,
  `rdv_object` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `rdv_object`
--

INSERT INTO `rdv_object` (`rdv_object_Id`, `rdv_object`) VALUES
(1, 'Santé'),
(2, 'Habitation'),
(3, 'Auto'),
(4, 'Assurance prêt'),
(5, 'Prévoyance'),
(6, 'Chient et chat');

-- --------------------------------------------------------

--
-- Structure de la table `rdv_status`
--

CREATE TABLE `rdv_status` (
  `rdv_status_Id` int(11) NOT NULL,
  `rdv_status` varchar(255) NOT NULL DEFAULT 'à venir'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `rdv_status`
--

INSERT INTO `rdv_status` (`rdv_status_Id`, `rdv_status`) VALUES
(1, 'à venir'),
(2, 'annulé'),
(3, 'à payer'),
(4, 'payé'),
(5, 'sans issue');

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `Id` int(11) NOT NULL,
  `role_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `role`
--

INSERT INTO `role` (`Id`, `role_name`) VALUES
(1, 'Administrateur'),
(2, 'Partenaire'),
(3, 'Client'),
(4, 'Apporteur d\'affaires'),
(5, 'Commercial');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `user_Id` int(11) NOT NULL,
  `user_name` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_first_name` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role_Id` int(6) DEFAULT NULL,
  `tel` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mail` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `code_postal` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(88) COLLATE utf8_unicode_ci NOT NULL,
  `date_creation` datetime NOT NULL DEFAULT '2017-10-06 10:10:00',
  `last_modif` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`user_Id`, `user_name`, `user_first_name`, `role_Id`, `tel`, `mail`, `address`, `city`, `code_postal`, `password`, `date_creation`, `last_modif`) VALUES
(1, 'Othmane', 'Zakaria', 1, '06 51 59 62 91', 'zakaria@gmail.com', '35 route de Pontoise', 'Argenteuil', '95100', '$2y$10$KM/HkJenwj7yViiP1vNfi.1lTJRHaZa.Yc2hcR3BNqNhbAOdSwAlW', '2017-10-06 10:10:00', NULL),
(21, 'partenaire', 'partenaire', 2, '0121122112', 'partenaire@gmail.com', 'anrusitenarusit', 'Paris', '75000', '$2y$10$fZr/MtTECJEOSNsl446/VupGyPLP1QS8Cw/B5.sKeTFbvonu4c2Pe', '2017-10-30 20:26:36', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `visibility`
--

CREATE TABLE `visibility` (
  `visibility_Id` int(11) NOT NULL,
  `visibility_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `visibility`
--

INSERT INTO `visibility` (`visibility_Id`, `visibility_name`) VALUES
(1, 'Administrateur'),
(2, 'Apporteur d\'affaires'),
(3, 'Commerciaux'),
(4, 'Public'),
(5, 'Partenaire');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_Id`);

--
-- Index pour la table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`contact_Id`);

--
-- Index pour la table `devis`
--
ALTER TABLE `devis`
  ADD PRIMARY KEY (`devis_Id`);

--
-- Index pour la table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_Id`),
  ADD KEY `start` (`start`),
  ADD KEY `end` (`end`),
  ADD KEY `date_end_rec` (`date_end_rec`),
  ADD KEY `user_Id` (`user_Id`,`category_Id`,`visibility_Id`),
  ADD KEY `fk_event_category` (`category_Id`),
  ADD KEY `fk_event_visibility` (`visibility_Id`);

--
-- Index pour la table `rdv`
--
ALTER TABLE `rdv`
  ADD PRIMARY KEY (`rdv_Id`),
  ADD UNIQUE KEY `rdv_Id` (`rdv_Id`),
  ADD KEY `event_Id` (`event_Id`),
  ADD KEY `fk_rdv_rdv_status` (`rdv_status_Id`),
  ADD KEY `fk_rdv_rdv_object` (`rdv_object_Id`);

--
-- Index pour la table `rdv_object`
--
ALTER TABLE `rdv_object`
  ADD PRIMARY KEY (`rdv_object_Id`);

--
-- Index pour la table `rdv_status`
--
ALTER TABLE `rdv_status`
  ADD PRIMARY KEY (`rdv_status_Id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_Id`),
  ADD UNIQUE KEY `mail_2` (`mail`),
  ADD KEY `mail` (`mail`),
  ADD KEY `role` (`role_Id`);

--
-- Index pour la table `visibility`
--
ALTER TABLE `visibility`
  ADD PRIMARY KEY (`visibility_Id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `category_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `contact`
--
ALTER TABLE `contact`
  MODIFY `contact_Id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `devis`
--
ALTER TABLE `devis`
  MODIFY `devis_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=267;
--
-- AUTO_INCREMENT pour la table `event`
--
ALTER TABLE `event`
  MODIFY `event_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=693;
--
-- AUTO_INCREMENT pour la table `rdv`
--
ALTER TABLE `rdv`
  MODIFY `rdv_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT pour la table `rdv_object`
--
ALTER TABLE `rdv_object`
  MODIFY `rdv_object_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT pour la table `rdv_status`
--
ALTER TABLE `rdv_status`
  MODIFY `rdv_status_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `user_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT pour la table `visibility`
--
ALTER TABLE `visibility`
  MODIFY `visibility_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `fk_event_category` FOREIGN KEY (`category_Id`) REFERENCES `category` (`category_Id`),
  ADD CONSTRAINT `fk_event_user` FOREIGN KEY (`user_Id`) REFERENCES `user` (`user_Id`),
  ADD CONSTRAINT `fk_event_visibility` FOREIGN KEY (`visibility_Id`) REFERENCES `visibility` (`visibility_Id`);

--
-- Contraintes pour la table `rdv`
--
ALTER TABLE `rdv`
  ADD CONSTRAINT `fk_rdv_event` FOREIGN KEY (`event_Id`) REFERENCES `event` (`event_Id`),
  ADD CONSTRAINT `fk_rdv_rdv_object` FOREIGN KEY (`rdv_object_Id`) REFERENCES `rdv_object` (`rdv_object_Id`),
  ADD CONSTRAINT `fk_rdv_rdv_status` FOREIGN KEY (`rdv_status_Id`) REFERENCES `rdv_status` (`rdv_status_Id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`role_Id`) REFERENCES `role` (`Id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
