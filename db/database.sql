create database if not exists monprojet_user character set utf8 collate utf8_unicode_ci;
use monprojet;

grant all privileges on monprojet.* to 'monprojet_user'@'localhost' identified by 'monprojet';
