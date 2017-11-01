<?php

namespace App\Admin\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\{ Response, Request };
use App\Admin\Calendar\Filter\{ EventFilter, RdvStatusFilter };

class CalendarController
{

  // Renvoi les événements pour le calendrier
  public function getEventsAction (Application $app, Request $request, string $start, string $end)
  {
    if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated() && $app['session']->get('user')->getRole() === 'Administrateur') {
      try {
        $events = $app['dao.event']->getEvents($start, $end);
        return $app->json($events);
      } catch (\Throwable $e) {
        return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
      }
    }
    if ($request->headers->get('my-method') === 'XMLHttpRequest') {
      return new Response('Connexion expirée', 500);
    }
    return $app->redirect($app['url_generator']->generate('login'));
  }

  // Renvoi les événements avec les détails
  public function getEventsByIdsAction (Application $app, Request $request, string $ids)
  {
    if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated() && $app['session']->get('user')->getRole() === 'Administrateur') {
      try {
        $events = $app['dao.event']->getEventsByIds($ids);
        return $app->json($events);
      } catch (\Throwable $e) {
        return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
      }
    }
    if ($request->headers->get('my-method') === 'XMLHttpRequest') {
      return new Response('Connexion expirée', 500);
    }
    return $app->redirect($app['url_generator']->generate('login'));
  }

  // Ajoute un événement
  public function addEventAction(Application $app, Request $request)
  {
    if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated() && $app['session']->get('user')->getRole() === 'Administrateur') {
      try {
        if (!empty($request->request->all())) {
          $eventFilter = new EventFilter($request->request->all());
          $event = $app['dao.event']->save($app['session']->get('user')->getUser_Id(), $eventFilter->getFiltredData());
          return $app->json($event);
          return new Response('Reponse '.$event);
        }
      } catch (\Throwable $e) {
        return new Response('Une erreur est survenue avec le serveur', 500);
        // return new Response($e->getMessage(), 500);
      }
    }
    if ($request->headers->get('my-method') === 'XMLHttpRequest') {
      return new Response('Connexion expirée', 500);
    }
    if ($request->headers->get('my-method') === 'XMLHttpRequest') {
      return new Response('Connexion expirée', 500);
    }
    return $app->redirect($app['url_generator']->generate('login'));
  }

  // Supprime un événement
  public function deleteEventAction (int $id, Application $app, Request $request)
  {
    if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated() && $app['session']->get('user')->getRole() === 'Administrateur') {
      try {
        $app['dao.event']->delete($id);
        return new Response('No Content', 204);
      } catch (\Throwable $e) {
        // return new Response($e->getMessage(), 500);
        return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
      }
    }
    if ($request->headers->get('my-method') === 'XMLHttpRequest') {
      return new Response('Connexion expirée', 500);
    }
    return $app->redirect($app['url_generator']->generate('login'));
  }

  /**
   * Modifie un évènement
   *
   * @return 
   */
  public function updateEventAction(Application $app, Request $request)
  {
    if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated() && $app['session']->get('user')->getRole() === 'Administrateur') {
      try {
        if (!empty($request->request->all())) {
          $eventFilter = new EventFilter($request->request->all());
          $event = $app['dao.event']->updateEvent($eventFilter->getFiltredData(), $app['session']->get('user')->getUser_Id());
          return $app->json($event);
          return $app->json($request->request->all());
        }
      } catch (\Exception $e) {
        // return new Response('Mess '.$e->getMessage(), 500);
        return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
      }
    }
    if ($request->headers->get('my-method') === 'XMLHttpRequest') {
      return new Response('Connexion expirée', 500);
    }
    return $app->redirect($app['url_generator']->generate('login'));
  }

  /**
   * Renvoi les rdvs
   *
   * @return void
   */
  public function getRdvsAction(Application $app, int $page, Request $request)
  {
    if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated() && $app['session']->get('user')->getRole() === 'Administrateur') {
      try {
        return $app->json($app['dao.event']->getRdvs($page));
        $rdvs = $app['dao.event']->getRdvs($page);
        return $app->json($rdvs);
      } catch (\Exception $e) {
        // return new Response($e->getMessage(), 500);
        return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
      }
    }
    if ($request->headers->get('my-method') === 'XMLHttpRequest') {
      return new Response('Connexion expirée', 500);
    }
    return $app->redirect($app['url_generator']->generate('login'));
  }

  /**
   * Change le status du rdv
   *
   * @return 
   */
  public function changeRdvStatusAction(Application $app, Request $request)
  {
    if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated() && $app['session']->get('user')->getRole() === 'Administrateur') {
      try {
        if (!empty($request->request->all())) {
          $rdvStatusFilter = new RdvStatusFilter($request->request->all());
          $filtredData = $rdvStatusFilter->getFiltredData();
          $app['dao.event']->changeRdvStatus($filtredData);
          return $app->json($filtredData);
        }
      } catch (\Exception $e) {
        // return new Response($e->getMessage(), 500);
        return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
      }
    }
    if ($request->headers->get('my-method') === 'XMLHttpRequest') {
      return new Response('Connexion expirée', 500);
    }
    return $app->redirect($app['url_generator']->generate('login'));
  }
}
