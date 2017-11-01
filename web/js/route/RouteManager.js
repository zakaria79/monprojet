import Route from './Route';

export default class RouteManager {

  constructor(routesParameters, routesNames, defaultRoute, callbacks) {
    this.callbacks = callbacks;
    this.routesNames = routesNames;
    this.defaultRoute = defaultRoute;
    this.routesParameters = routesParameters;
    this.routes = {};
    this.currentRouteName = window.location.pathname.replace(/.*\/([\w]*)$/, '$1');
  }

  run() {
    for (let rp of this.routesParameters) {
      this.routes[rp.name] = new Route(rp);
    }
    if (this.routesNames.includes(this.currentRouteName)) {
      this.currentRoute = this.routes[this.currentRouteName];
    } else {
      this.currentRoute = this.routes[this.defaultRoute];
    }
    this.callbacks[this.currentRoute.name]();
    this.currentRoute.render();
    window.onpopstate = (e) => {
      if (e.state) {
        this.changeRoute(this.currentRoute, this.routes[e.state.pageName]);
      }
    };
  }

  changeRoute(cur, next) {
    cur.activeButton.classList.remove('active');
    next.render();
    this.currentRoute = next;
    this.callbacks[this.currentRoute.name]();
  }

  onChangeRoute(e) {
    e.preventDefault();
    this.changeRoute(this.currentRoute, this.routes[e.currentTarget.dataset.route]);
  }

}
