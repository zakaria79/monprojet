<?php 

use Symfony\Component\Debug\{ ExceptionHandler, ErrorHandler };
use Symfony\Component\HttpFoundation\{ Response, Request };

ErrorHandler::register();
ExceptionHandler::register(false);

$app->register(new Silex\Provider\RoutingServiceProvider());

$app->register(new Silex\Provider\SessionServiceProvider());

$app->register(new Silex\Provider\SwiftmailerServiceProvider());

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/../src/App/views'
));

$app['twig'] = $app->extend('twig', function(Twig_Environment $twig, $app) {
    $twig->addExtension(new Twig_Extensions_Extension_Text());
    return $twig;
});

$app->register(new Silex\Provider\AssetServiceProvider(), array(
    'assets.version' => 'v1'
));

$app->register(new Silex\Provider\MonologServiceProvider(), array(
    'monolog.logfile' => __DIR__.'/../var/logs/portfolio.log',
    'monolog.name' => 'Portfolio',
    'monolog.level' => $app['monolog.level']
));

// $app['monolog']->addInfo("je fais des tests");

$app['dao.user'] = function ($app) {
    return new App\Admin\User\DAO\UserDAO($app);
};

$app['dao.event'] = function ($app) {
    return new App\Admin\Calendar\DAO\EventDAO($app);
};

$app['dao.partner_event'] = function ($app) {
  return new App\Partner\DAO\EventDAO($app);
};

$app['dao.calendar_config'] = function ($app) {
    return new App\Admin\Calendar\DAO\ConfigDAO($app);
};

$app['dao.devis'] = function ($app) {
    return new App\DAO\DevisDAO($app);
};

$app->error(function (\Exception $e, Request $request, $code) use ($app) {
    switch ($code) {
    case 403:
        $message = 'Accès non autorisé';
        break;
    case 404:
        $message = 'Cette page n\'existe pas';
        break;
    default:
        $message = "Une erreur c'est produit…";
    }
    return $app['twig']->render('error.html.twig', array('message' => $message));
});
