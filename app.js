import Koa from 'koa'
import views from 'koa-views'
import serve from 'koa-static'
import path from 'path'
import router from './controller'
import koaBodyParse from 'koa-bodyparser'
import session from 'koa-session-minimal'
import dotenv from 'dotenv';
import cache from 'koa-static-cache'
dotenv.config();
const app = new Koa();

app.use(koaBodyParse());

app.use(session({
    key: 'session-id',
    cookie: {
        domain: process.env.HOST_NAME,
        path: '/',
        maxAge: 1000 * 1000 * 30,
        httpOnly: true,
        overwrite: false
    }
}))

app.use(cache(path.join(__dirname, '/public'), {
    maxAge: 365 * 24 * 60 * 60
}))

app.use(serve(__dirname + '/public'));

app
    .use(views(path.join(__dirname, './views'), {
        extension: 'ejs'
    }));

app
    .use(router.routes(), router.allowedMethods());

app.listen(process.env.PORT, () => {
    console.log('listen 127.0.0.1:8080');
});

module.exports = app;
