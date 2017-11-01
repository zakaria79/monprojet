<?php

namespace App\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\{ Response, Request };
use App\Filter\DevisFilter;

class HomeController
{

  public function indexAction(Application $app)
  {
    try {
      if ($app['session']->get('user') !== null && $app['session']->get('user')->isAuthenticated()) {
        $user = $app['session']->get('user');
      } else {
        $user = ['username' => 'anonymous', 'isAuthenticated' => false ];
      }
      return $app['twig']->render('index.html.twig', array(
        'user' => $user
      ));
    } catch (\Throwable $e) {
      return $app['twig']->render('error.html.twig', array(
        // 'message' => $e->getMessage()
        'message' => 'Une erreur est survenue lors du chargement de la page'
      ));
    }
  }

  /**
   * Formulaire de devis
   *
   * @return 
   */
  public function devisAction(Application $app, Request $request)
  {
    try {
      if (!empty($request->request->all())) {
        $devisFilter = new DevisFilter($request->request->all());
        $devis = $app['dao.devis']->buildDomainObject($devisFilter->getFiltredData());
          // Envoi un E-mail à l'administrateur
          $app['dao.devis']->save($devis);
          $sujet = 'Nouvelle demande de devis';
          $message = $app['twig']->render('mail_devis.html.twig', array('contact' => $devis));
          $headers = 'MIME-Version: 1.0'."\r\n";
          $headers .= 'Content-type: text/html; charset=iso-8859-1'."\r\n";
          $headers .= 'To: Gilles contact@lesitedelassurance.fr'."\r\n";
          $headers .= 'From: contact@lesitedelassurance'."\r\n".'X-Mailer: PHP/'.phpversion();
          $to = 'contact@lesitedelassurance.fr';
          // Retourne un boolean
          $res = \mail($to, $sujet, $message, $headers);
          return $app->json($request->request->all());
      }
      return new Response('Le formulaire est vide', 500);
    } catch (\Throwable $e) {
      // return new Response('Le formulaire n\'a pas pu être envoyé, un des champs du formulaire pourrai être invalide', 500);
      return new Response($e->getMessage(), 500);
    }
  }
  
  /**
   * Affiche le formulaire de connexion
   *
   * @return 
   */
  public function loginAction(Application $app)
  {
    $error_message = $app['session']->get('error_login_message');
    $app['session']->set('error_login_message', null);
    return $app['twig']->render('login.html.twig', array( 'error_message' => $error_message));
  }
}
