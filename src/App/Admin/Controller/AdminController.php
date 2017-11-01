<?php

namespace App\Admin\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\{ Response, Request };
use App\Admin\User\Filter\{ UserAddFilter, UserFilter };

class AdminController
{

  public function indexAction(Application $app)
  {
    try {
      if ($user = $app['session']->get('user') && $app['session']->get('user')->isAuthenticated() && $app['session']->get('user')->getRole() === 'Administrateur') {
        return $app['twig']->render('Admin/index.html.twig', array(
          'categories' => $app['dao.calendar_config']->getCategories(),
          'visibilities' => $app['dao.calendar_config']->getVisibilities()
        ));
      }
      return $app->redirect($app['url_generator']->generate('login'));
    } catch (\Throwable $t) {
      return $app['twig']->render('error.html.twig', array('message' => 'Une erreur est survenue lors du chargement de la page'));
    }
  }

  /**
   * Vérifie le formulaire de connexion
   *
   * @return 
   */
  public function loginCheckAction(Application $app, Request $request)
  {
    if (!empty($request->request->all())) {
      $userFilter = new UserFilter($request->request->all());
      $filtredData = $userFilter->getFiltredData();
      $user = $app['dao.user']->find($filtredData);
      if ($user !== null && \password_verify($filtredData['password'], $user->getPassword())) {
        $app['session']->set('user', $user);
        $app['session']->get('user')->setIsAuthenticated(true);
        if ($user->getRole() === 'Administrateur') {
          return $app->redirect('/admin');
        }
        return $app->redirect('/partner');
      }
      $app['session']->set('error_login_message', 'Les indentifiants ne correspondent à aucun compte');
      return $app->redirect('/login');
    }
  }

  /**
   * Déconexion
   *
   * @return 
   */
  public function logoutAction(Application $app)
  {
    $app['session']->set('user', null);
    return $app->redirect($app['url_generator']->generate('courtalia'));
  }

  /**
   * Récupère la liste des utilisateurs
   *
   * @return 
   */
  public function getUsersAction(Application $app, int $user_role)
  {
    try {
      if ($user = $app['session']->get('user') && $app['session']->get('user')->isAuthenticated() && $app['session']->get('user')->getRole() === 'Administrateur') {
        $users = $app['dao.user']->findAll($user_role);
        return $app->json($users);
      }
      if ($request->headers->get('my-method') === 'XMLHttpRequest') {
        return new Response('Connexion expirée', 500);
      }
      return $app->redirect($app['url_generator']->generate('login'));
    } catch (\Throwable $t) {
      return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
    }
  }

  // Créé un utilisateur
  public function addUserAction(Application $app, Request $request)
  {
    try {
      if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated() && $app['session']->get('user')->getRole() === 'Administrateur') {
        if (!empty($request->request->all())) {
          $userFilter = new UserAddFilter($request->request->all());
          $data = $userFilter->getFiltredData();
          if ($data['role'] === 1) {
            if (!isset($data['password_confirmation']) || !\password_verify($data['password_confirmation'], $app['session']->get('user')->getPassword())) {
              return new Response('Mot de passe invalide', 403);
            }
          }
          if (!empty($data['password']) && $data['password'] !== $data['password2']) {
            return new Response('Les deux mots de passes sont différents !', 500);
          }
          $res = $app['dao.user']->save($userFilter->getFiltredData(), $app['session']->get('user')->getUser_Id());
          if ($res[1]) {
            return new Response('User exists', 500);
          }
          $user = $res[0];
          // $sujet = 'Votre nouveaau compte Courtalia';
          // $message = $app['twig']->render('new_account_mail.html.twig', array('user' => $user));
          // $headers = 'MIME-Version: 1.0'."\r\n";
          // $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
          // $headers .= 'To: Gilles contact@lesitedelassurance'."\r\n";
          // $headers .= 'From: contact@lesitedelassurance'."\r\n".'X-Mailer: PHP/'.phpversion();
          // $to = 'contact@lesitedelassurance';
          // $res = \mail($to, $sujet, $message, $headers); // Retourne un boolean
          return $app->json($userFilter->getFiltredData());
        }
      }
      if ($request->headers->get('my-method') === 'XMLHttpRequest') {
        return new Response('Connexion expirée', 401);
      }
      return $app->redirect($app['url_generator']->generate('login'));
    } catch (\Throwable $t) {
      // return new Response('Un problème est survenu lors de la requête vers le serveur '.$t->getMessage(), 500);
      return new Response('Un problème est survenu lors de la requête vers le serveur ', 500);
    }
  }

  /**
   * Renvoi les devis
   *
   * @return void
   */
  public function getDevisAction(Application $app, int $page, Request $request)
  {
    if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated() && $app['session']->get('user')->getRole() === 'Administrateur') {
      try {
        $devis = $app['dao.devis']->getDevis($page);
        return $app->json($devis);
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
   * Supprime des devis à partir de leurs identifiants
   *
   * @return 
   */
  public function deleteDevisAction(Application $app, Request $request)
  {
    try {
      if ($user = $app['session']->get('user') && $app['session']->get('user')->isAuthenticated() && $app['session']->get('user')->getRole() === 'Administrateur') {
        $devisFiltredData = filter_var_array(
          $request->request->all(),
          array(
            'devis' => array(
              'filter' => FILTER_VALIDATE_INT,
              'flags' => FILTER_FORCE_ARRAY,
              'options' => array(
                'min_range' => 1
              )
            )
          )
        );
        $users = $app['dao.devis']->delete($devisFiltredData);
        return $app->json($devisFiltredData);
      }
      if ($request->headers->get('my-method') === 'XMLHttpRequest') {
        return new Response('Connexion expirée', 500);
      }
      return $app->redirect($app['url_generator']->generate('login'));
    } catch (\Throwable $t) {
      // return new Response($t->getMessage());
      return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
    }
  }
  

  /**
   * Pour changer de mot de passe
   *
   * @return void
   */
  public function changePasswordAction(Application $app, Request $request)
  {
    try {
      if ($app['session']->get('user') && $app['session']->get('user')->isAuthenticated()) {
        if (!empty($request->request->all())) {
          if (\password_verify($request->get('old_pass'), $app['session']->get('user')->getPassword())) {
            if ($request->get('new_password') === $request->get('new_password_confirm')) {
              $app->json($app['dao.user']->updatePassword($app['session']->get('user')->getUser_Id(), \htmlspecialchars($request->get('new_password'))));
              $app['session']->getFlashBag()->add('success_message', 'Votre mot de passe à été mis à jour avec succès');
              return $app->redirect($app['url_generator']->generate('courtalia'));
            } else {
              $app['session']->getFlashBag()->add('error_message', 'Les deux mots de passe sont différents');
            }
          } else {
            $app['session']->getFlashBag()->add('error_message', 'Mot de passe incorrect');
          }
        }
        return $app['twig']->render('Admin/change_password.html.twig');
      }
      return $app->redirect($app['url_generator']->generate('login'));
    } catch (\Throwable $t) {
      return $app['twig']->render('error.html.twig', array('message' => 'Une erreur est survenue lors du chargemant de la page'));
    }
  }
}
