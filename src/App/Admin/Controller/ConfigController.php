<?php

namespace App\Admin\Controller;

use Silex\Application;
use Symfony\Component\HttpFoundation\{ Response, Request };

class ConfigController
{

	public function getVisibilitiesAction (Application $app)
	{
		try {
			$visibilities = $app['dao.calendar_config']->getVisibilities();
			return $app->json($visibilities);
		} catch (\Exception $e) {
			 // return new Response($e->getMessage(), 500);
		return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
		}
	}

	/**
	 * Récupère les catégories de la base de données
	 *
	 * @return 
	 */
	public function getCategoriesAction()
	{
		try {
			$categories = $app['dao.calendar_config']->getCategories();
			return $app->json($categories);
		} catch (\Exception $e) {
			 // return new Response($e->getMessage(), 500);
		return new Response('Un problème est survenu lors de la requête vers le serveur', 500);
		}
	}
}
