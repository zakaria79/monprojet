import Xhr from './../../../../../xhr/Xhr';
import Devis from './Devis.js';

export default class DevisManager extends Xhr {
    constructor(app) {
        super();
        this.req = this.getXhr();
        this.insuranceTypeTitle = {
            sante: 'Santé',
            habitation: 'Habitation',
            auto: 'Auto',
            pret: 'Prêt',
            prevoyance: 'Prévoyance'
        };
    }

    getDevis(page, success, reject) {
        let devisArray = [],
            devis, dev;
        this.req.open('GET', '/admin/devis/' + page);
        this.req.setRequestHeader("my-method", "XMLHttpRequest");
        this.req.onreadystatechange = () => {
            if (this.req.readyState === XMLHttpRequest.DONE) {
                if (this.req.status === 200) {
                    devis = JSON.parse(this.req.responseText);
                    if (+devis.total > 0) {
                        for (dev of devis.devis) {
                            devisArray.push(this.buildDevisObject(dev));
                        }
                        success(devisArray, +devis.total);
                        return;
                    }
                    success(null);
                    return;
                }
                reject(this.req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
            }
        };
        this.req.send(null);
    }

    buildDevisObject(data) {
        let devis = new Devis();
        devis.Id = data.devis_Id;
        devis.lastname = data.lastname;
        devis.firstname = data.firstname;
        devis.tel = data.tel;
        devis.birthDate = data.birth_date;
        devis.postalCode = data.postal_code;
        devis.city = data.city;
        devis.email = data.email;
        devis.dateCreation = data.date_creation;
        devis.insuranceType = data.insurance_type;
        devis.prosPart = data.pros_part;
        devis.insuranceTypeTitle = this.insuranceTypeTitle[devis.insuranceType];
        switch (devis.insuranceType) {
            case 'sante':
                devis.santeData = {
                    hospitalisation: data.hospitalisation,
                    medecine: data.medecine,
                    dentaire: data.dentaire,
                    optique: data.optique
                };
                break;
            case 'auto':
                devis.autoData = {
                    assureActuellement: data.assure_actuellement,
                    garantieSouhaite: data.garantie_souhaite,
                    bonus: data.bonus
                };
                break;
            case 'pret':
                devis.pretData = {
                    assureActuellement: data.assure_actuellement,
                    residencePrincipale: data.residence_principale
                };
                break;
            case 'habitation':
                devis.habitationData = {
                    habitationActuelle: data.habitation_actuelle,
                    nbPieces: data.nb_pieces
                };
                break;
            case 'prevoyance':
                devis.prevoyanceData = {
                    assuranceDeces: data.assurance_deces,
                    accidentVie: data.accident_vie
                };
        }
        return devis;
    }

    deleteDevis(data, success, reject) {
        this.req.open('POST', '/admin/delete/devis');
        this.req.setRequestHeader("my-method", "XMLHttpRequest");
        this.req.onreadystatechange = () => {
            if (this.req.readyState === XMLHttpRequest.DONE) {
                if (this.req.status === 200) {
                    success(JSON.parse(this.req.responseText));
                    return;
                }
                reject(this.req.responseText === 'Connexion expirée' ? 'La connexion est expirée veullez raffraichir la page pour vous reconnecter' : undefined);
            }
        };
        this.req.send(data);
    }
}
