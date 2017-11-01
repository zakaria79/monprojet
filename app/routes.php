<?php

// Formulaire de devis
$app->post('/devis', "App\Controller\HomeController::devisAction")->bind('devis');

// Formulaire de connexion
$app->get('/login', "App\Controller\HomeController::loginAction")->bind('login');

// Url de déconnexion
$app->get('/admin/logout', "App\Admin\Controller\AdminController::logoutAction")->bind('logout');

// Vérifie les indentifiants pour la connexion
$app->post('/admin/logincheck', "App\Admin\Controller\AdminController::loginCheckAction")->bind('login_check');

// Supprime des devis
$app->post('/admin/delete/devis', "App\Admin\Controller\AdminController::deleteDevisAction");

// Renvoi les devis
$app->get('/admin/devis/{page}', "App\Admin\Controller\AdminController::getDevisAction")->assert('page', '\d');

// Ajouter un évenememt dans le calendrier
$app->post('/admin/calendar/addevent', "App\Admin\Controller\CalendarController::addEventAction")->bind('add_event');

// Change le status des rdvs
$app->post('/admin/rdvs/status', "App\Admin\Controller\CalendarController::changeRdvStatusAction");

// Renvoi les rdvs
$app->get('/admin/rdvs/{page}', "App\Admin\Controller\CalendarController::getRdvsAction")->assert('page', '\d');

// Récupérer les évenements du calendrier
$app->get('/admin/calendar/events/{start}/{end}', "App\Admin\Controller\CalendarController::getEventsAction")
  ->assert('start','\d{4}(-\d{2}){2}')
  ->assert('end','\d{4}(-\d{2}){2}');

// Ajouter Un Utilisateur
$app->post('/admin/adduser', "App\Admin\Controller\AdminController::AddUserAction");

// Administration lesitedelassurance
$app->get('/admin', "App\Admin\Controller\AdminController::indexAction")->bind('admin_courtalia');

// Configuration du calendrier
$app->get('/admin/calendar/config/visibilities',"App\Admin\Controller\ConfigController::getVisibilitiesAction");

// Renvoi les évènements à partir des indentifiants
$app->get('/admin/calendar/eventsids/{ids}', "App\Admin\Controller\CalendarController::getEventsByIdsAction");

// Supprime un évenement
$app->get('/admin/calendar/{id}/delete', "App\Admin\Controller\CalendarController::deleteEventAction")
  ->bind('delete_event')
  ->assert('id','\d+');

// Configuration du calendrier
$app->get('/admin/calendar/config/categories',"App\Admin\Controller\ConfigController::getCategoriesAction");

// Configuration du calendrier
$app->get('/admin/calendar/config/visibilities',"App\Admin\Controller\ConfigController::getVisibilitiesAction");

// Configuration du calendrier
$app->post('/admin/calendar/updateevent',"App\Admin\Controller\CalendarController::updateEventAction");

// Renvoi la liste des utilisateurs en base de données
$app->get('/admin/users/{user_role}',"App\Admin\Controller\AdminController::getUsersAction")->assert('user_role', '\d')->value('user_role', 2);

// pour changer son mot de passe
$app->match('/admin/changepass', "App\Admin\Controller\AdminController::changePasswordAction")->bind('change_password');

// Espace Partenaire
$app->get('/partner/events/{page}', "App\Partner\Controller\PartnerController::getEventsAction")->bind('partner_events')->value('page', 1)->assert('page', '\d');

// Enregistre le rdv du partenaire
$app->post('/partner/rdv', "App\Partner\Controller\PartnerController::rdvFormAction")->bind('partner_rdv');

// Renvoi les plages non disponibles du calendrier
$app->get('/partner/calendarevents/{start}/{end}', "App\Partner\Controller\PartnerController::getEventsForCalendarAction")
  ->assert('start','\d{4}(-\d{2}){2}')
  ->assert('end','\d{4}(-\d{2}){2}');

// Espace Partenaire
$app->get('/partner/{page}', "App\Partner\Controller\PartnerController::indexAction")->assert('page', 'reporting|calendar|')->bind('partner');

// Accueil Site Courtalia
$app->get('/', "App\Controller\HomeController::indexAction")->bind('courtalia');
