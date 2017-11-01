<?php 

use Silex\Application;

require_once __DIR__.'/../vendor/autoload.php';

$app = new Application();
// require __DIR__.'/../app/config/dev.php';
require __DIR__.'/../app/config/prod.php';
require __DIR__.'/../app/app.php';
require __DIR__.'/../app/routes.php';
#$app['monolog']->addInfo("Ceci est un évènement de test");
$app->run();
