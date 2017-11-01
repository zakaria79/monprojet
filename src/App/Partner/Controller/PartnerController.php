<?php

namespace App\Partner\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\{ Response, Request };
use App\Partner\Filter\RdvFilter;

class PartnerController
{

  public function indexAction(Application $app)
  {
    if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated()) {
      return $app['twig']->render('Partner/index.html.twig', array(
        'user' => $app['session']->get('user')
      ));
    }
    if ($request->headers->get('my-method') === 'XMLHttpRequest') {
      return new Response('Connexion expirée', 500);
    }
    return $app->redirect($app['url_generator']->generate('login'));
  }

  /**
   * Renvoi les événements du partenaire
   *
   * @return
   */
  public function getEventsAction(Application $app, int $page)
  {
    if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated()) {
      try {
        return $app->json($app['dao.partner_event']->getEventsByUser($app['session']->get('user')->getUser_Id(), $page));
      } catch (\Exception $e) {
         // return new Response('Ça marche pas'.$e->getMessage(), 500);
        return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
      }
    }
    if ($request->headers->get('my-method') === 'XMLHttpRequest') {
      return new Response('Connexion expirée', 500);
    }
    return $app->redirect($app['url_generator']->generate('login'));
  }

  /**
   * undocumented function
   *
   * @return void
   */
  public function getEventsForCalendarAction(Application $app, string $start, string $end)
  {
    if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated()) {
      try {
        return $app->json($app['dao.partner_event']->getNonAvailableEvents($start, $end));
      } catch (\Exception $e) {
         return new Response('Ça marche pas'.$e->getMessage(), 500);
        return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
      }
    }
    if ($request->headers->get('my-method') === 'XMLHttpRequest') {
      return new Response('Connexion expirée', 500);
    }
    return $app->redirect($app['url_generator']->generate('login'));
  }

  /**
   * Enregistre un rdv
   *
   * @return 
   */
  public function rdvFormAction(Application $app, Request $request)
  {
    if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated()) {
      try {
        if (!empty($request->request->all())) {
          $rdvFilter = new RdvFilter($request->request->all());
          $rdv = $app['dao.partner_event']->saveRdv($rdvFilter->getFiltredData(), $app['session']->get('user'));
          return $app->json($rdv);
          return $app->json($request->request->all());
        }
        return $app->json($request->request->all());
      } catch (\Exception $e) {
        return new Response($e->getMessage(), 500);
        return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
      }
    }
    if ($request->headers->get('my-method') === 'XMLHttpRequest') {
      return new Response('Connexion expirée', 500);
    }
    return $app->redirect($app['url_generator']->generate('login'));
  }
}
