import Route from '../structures/route';
import {Logger} from "@classycrafter/super-logger";

export default class IndexRoute extends Route {

    constructor(logger: Logger) {
        super(logger, {
            path: '/'
        });
    };

    public initializeRoutes() {
        this.router.get('/', (req, res) => {
            res.render('index', { title: 'Home' });
        });
    };
}