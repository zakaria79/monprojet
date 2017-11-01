import xhr from './../../../../../xhr/Xhr';

export default class Config extends xhr {

  getConfig(success, reject) {
    let req = this.getXhr();
    req.open('GET', 'calendar/config');
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          success(JSON.parse(req.responseText));
        }
        reject('Impossible de récupérer la configuration du calendrier');
      }
    };
    req.send(null);
  }

  get visibilities() {
    let req = this.getXhr();
    req.open('GET', 'calendar/config/visibilities');
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          success(JSON.parse(req.responseText));
        }
        reject('Impossible de récupérer la configuration du calendrier');
      }
    };
    req.send(null);
  }

  get categories() {
     let req = this.getXhr();
    req.open('GET', 'calendar/config/categories');
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          success(JSON.parse(req.responseText));
        }
        reject('Impossible de récupérer la configuration du calendrier');
      }
    };
    req.send(null);
  }
}
