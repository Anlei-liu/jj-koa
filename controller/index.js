import Router from 'koa-router'
import { selectToken } from '../models/user'

import frontEnd from './frontEnd'
import admin from './backEnd/admin'
import posts from './backEnd/posts'
import productList from './backEnd/product'
import module from './backEnd/module'
import manage from './backEnd/manage'
import api from './api'

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

const router = new Router();
const backend = new Router();
const apiRou = new Router();

frontEnd(router);
admin(router)
api(apiRou);

posts(backend);
productList(backend);
module(backend);
manage(backend);

router
    .use('/customer', auth, backend.routes(), backend.allowedMethods());
router
    .use('/api', Oauth, apiRou.routes(), apiRou.allowedMethods());

export default router
