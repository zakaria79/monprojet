export default class AdminAction {
    constructor(app) {
        this.app = app;
        this.dem = app.dem;
    }

    run() {
        let Es = this.dem.getElements();
    }
}
