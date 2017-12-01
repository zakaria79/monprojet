# monprojet

Site pour un courtier en assurance

Pour installer le projet dans un serveur :

* composer update
* npm install
* Importer dans la base de données MySQL ou MariaDB les fichiers sql qui se trouvent dans le dossier db/
* Ne pas oublier de créer le dossier var/logs à la racine du projet et d'autoriser l'écriture
* Identifiants admin : zakaria@gmail.com
* Mot de passe admin : zakaria (pour essayer l'espace administrateur)
* Identifiant partenaire : partenaire@gmail.com
* Mot de passe partenaire : partenaire

## Coté serveur (sur Ubuntu)

* sudo a2enmod rewrite
* sudo systemctl restart apache2

### Acceder au site en local à l'adresse "monprojet/"

* Copier le fichier apache-conf/monprojet.conf dans /etc/apache2/sites-available/
* sudo a2ensite monprojet.conf
* sudo systemctl restart apache2
* Ajouter la ligne "127.0.0.1 monprojet" dans /etc/hosts

## Framework, bibliothèques, outils utilisés

* Silex
* composer
* Twig
* Bootstrap 4
* Webpack
* Babel
* node
* npm
* jquery

## Langages

* PHP7
* JavaScript (ES6)
* HTML 5
* CSS3
* SQL


Il y a beaucoup de code natif dans ce projet, surtout en JavaScript
car il est présenté pour valider un diplôme de fin de formation.

Une version est en cours de realisation avec des frameworks et des bibliothèques plus moderne
tel que Symphony ou React.

Une application mobile est aussi prévue

## Description du projet

### Fonctionnalités:

#### Page d'accueil

 * Connexion et déconnexion pour les administrateurs et partenaires
 * Formulaire intéractif, certains champs changent en fonction des selections de l'utilisateur
    Le formulaire est soumis via une requête Ajax 'POST' et se referme après validation


#### Espace "Partenaire"

Toutes les intéractions avec l'utilisateur sont gérées en JavaScript natif

L'espace "Partenaire" a trois pages:

  * Mon Reporting
  * Mon Calendrier
  * Mon compte (Pour l'instant l'utilisateur ne peut que changer son mot de passe)


La navigation entre les deux premières pages est totalement géré avec du JavaScript natif

##### La page "Reporting"

  * Affichage avec pagination des rendez-vous pris par le partenaire avec des information sur le client et
  le status du rendez-vous

##### La page "Calendrier"

  * Calendrier semainier pour prendre des rendez-vous. Les plages disponibles sont affichés en rouge
  Un formulaire de rendez-vous est affiché lorsqu'une plage horaire est sélectionnée


#### Espace "Administrateur"

Je travail encore sur la partie "Partenaire" et la partie "Administrateur",
il y a encore quelques test à faire

Toutes les intéractions avec l'utilisateur sont gérées en JavaScript natif

L'administrateur peut:

  * Voir tous les rendez-vous pris par les partenaires avec un système de pagination
  * Changer le status du rendez-vous
  * Visualiser les demande de devis avec un système de pagination et les supprimer
  * Visualiser la liste des utilisateurs "Administrateurs" et "Partenaires" et en ajouter
  * Changer son mot de passe
  * Visualiser tous les événements dans un calendrier à 4 vues (Mois, Semaine, 4 Jours, 1 jour)
  * Ajouter des événements qui peuvent être récurrents (tous les jours, semaines, mois, ans)
  ces événements sont alors affichés dans le calendrier
  * Supprimer ou modifier des événements existant
  * Afficher les détails des événements
