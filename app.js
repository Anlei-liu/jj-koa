import Koa from 'koa'
import views from 'koa-views'
import serve from 'koa-static'
import path from 'path'
import router from './routes'
import koaBodyParse from 'koa-bodyparser'
import session from 'koa-session-minimal'

const app = new Koa();
const route = router(app);

app.use(koaBodyParse());
app.use(session({
    key: 'session-id',          // cookie 中存储 session-id 时的键名, 默认为 koa:sess
    cookie: {                   // 与 cookie 相关的配置
        domain: '127.0.0.1',    // 写 cookie 所在的域名
        maxAge: 1000 * 30,      // cookie 有效时长
        httpOnly: true,         // 是否只用于 http 请求中获取
        overwrite: false        // 是否允许重写
    }
}))

app.use(serve(__dirname + '/public'));

app
    .use(views(path.join(__dirname, './views'), {
        extension: 'ejs'
    }));

app
    .use(route.routes(), route.allowedMethods());

app.listen('8080', () => {
    console.log('listen 127.0.0.1:8080');
});

module.exports = app;