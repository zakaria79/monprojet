<?php 

namespace DAO;

use Silex\Application;

abstract class DAO
{
    /**
     * Database connection 
     *
     * @var
     */
    private $bdd;
    private $host;
    private $dbname;
    private $user;
    private $pass;


    /**
     * @param Application $app
     */
    public function __construct(Application $app)
    {
        $this->host = $app['db.options']['host'];
        $this->dbname= $app['db.options']['dbname'];
        $this->user = $app['db.options']['user'];
        $this->pass = $app['db.options']['password'];
    }
    

    /**
     * Grants access to the database connection object
     *
     * @return 
     */
    protected function getBdd() {
        try {
            $this->bdd = new \PDO( 'mysql:host='.$this->host.';dbname='.$this->dbname.';charset=utf8',
                $this->user,
                $this->pass,
                array(\PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION)
            );
            return $this->bdd;

        } catch (\PDOException $e) {
            throw new \Exception(
                'Impossible de se connecter à la base de données <br />
                le message est '.$e->getMessage()
            );
        }
    }
}
