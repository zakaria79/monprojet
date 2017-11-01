export default class xhr {

  constructor() {
    this.xhr = false;
  }

  getXhr () {
    if (this.xhr) {
      return this.xhr;
    }
    if (window.XMLHttpRequest) {
      this.xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      try {
        this.xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
      }
    }
    if (!this.xhr) {
      alert('Abandon : Impossible de crée une instance XMLHTTP');
      return false;
    }
    return this.xhr;
  }

  sendContact (data, callback) {
    let req = this.req();
    req.open('POST','contact');
    req.onreadystatechange = function () {
      if (req.readyState === XMLHttpRequest.DONE && req.status === 200) {
        callback(req.responseText);
      }
    };
    req.send(data);
  }
}
