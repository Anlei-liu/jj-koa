import Koa from 'koa'
import views from 'koa-views'
import serve from 'koa-static'
import path from 'path'
import router from './routes'
import koaBodyParse from 'koa-bodyparser'
import session from 'koa-session-minimal'
import dotenv from 'dotenv';
dotenv.config();
const app = new Koa();
const route = router(app);

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

app.use(serve(__dirname + '/public'));

app
    .use(views(path.join(__dirname, './views'), {
        extension: 'ejs'
    }));

app
    .use(route.routes(), route.allowedMethods());

app.listen(process.env.PORT, () => {
    console.log('listen 127.0.0.1:8080');
});

module.exports = app;
