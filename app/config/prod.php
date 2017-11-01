<?php 

$app['db.options'] = array(
  'driver'   => 'pdo_mysql',
  'charset'  => 'utf8',
  'host' => 'localhost',
  'port'     => '3306',
  'dbname' => 'monprojet',
  'user' => 'monprojet_user',
  'password' => 'monprojet'
);

// $app['debug'] = true;
$app['monolog.level'] = 'INFO';
