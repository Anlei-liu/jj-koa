import Router from 'koa-router'
// front end
import home from './controller/frontEnd/home'
import companyDynamics from './controller/frontEnd/companyDynamics'
import companyProfile from './controller/frontEnd/companyProfile'
import contact from './controller/frontEnd/contact'
import fishCake from './controller/frontEnd/fishCake'
import practice from './controller/frontEnd/practice'
import product from './controller/frontEnd/product'


// back end
import admin from './controller/backEnd/admin'
import posts from './controller/backEnd/posts'

export default () => {
    const router = new Router();
    home(router);
    companyDynamics(router);
    companyProfile(router);
    contact(router);
    fishCake(router);
    practice(router);
    product(router);

    admin(router);
    posts(router)

    return router
}