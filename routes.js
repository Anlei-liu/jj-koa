import Router from 'koa-router'
import { selectToken } from './models/user'

import {
    home,
    companyDynamics,
    companyProfile,
    contact,
    fishCake,
    practice,
    product,
    admin,
    posts,
    api,
    homeEdit,
} from './controller'

const auth = async (ctx, next) => {
    const cookieToken = ctx.session.token;
    const sqlToken  = await selectToken(cookieToken);
    if (sqlToken.length > 0) {
        ctx.session.token = cookieToken;
        await next();
    }else {
        ctx.redirect('/admin')
    }
};
const Oauth = async (ctx, next) => {
    const cookieToken = ctx.session.token;
    const sqlToken  = await selectToken(cookieToken);
    if (ctx.method === 'GET' || sqlToken.length > 0) {
        await next();
    }else {
        ctx.response.status = 300;
        ctx.response.body = {
            code: 0,
            message: '请先登陆'
        }
    }
};
export default () => {
    const router = new Router();
    const backend = new Router();
    const apiRou = new Router();
    home(router);
    companyDynamics(router);
    companyProfile(router);
    contact(router);
    fishCake(router);
    practice(router);
    product(router);
    admin(router);

    api(apiRou);

    posts(backend);
    homeEdit(backend);

    router.use('/customer', auth, backend.routes(), backend.allowedMethods());
    router.use('/api', Oauth, apiRou.routes(), apiRou.allowedMethods());
    return router
}
