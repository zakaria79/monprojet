CREATE database if NOT EXISTS monprojet character SET utf8 collate utf8_unicode_ci;
USE monprojet;

GRANT ALL PRIVILEGES ON monprojet.* TO 'monprojet_user'@'localhost' IDENTIFIED BY 'monprojet';
