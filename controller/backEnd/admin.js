import showUser from '../../models/user'

export default (router) => {
    router
        .get('/admin', async (ctx, next) => {
            if (ctx.session.token) {
                ctx.redirect('/posts')
            }
            await ctx.render('backEnd/admin', {
                title: 'login'
            })
        })
        .post('/admin', async (ctx, next) => {
            const { account, password } = ctx.request.body;
            let result = {};
            let psw = await showUser(account, password);
            if (psw.length > 0) {
                ctx.session.token = '2131231';
                result.code = 1;
                result.message = 'success';
            }else {
                result.code = 0;
                result.message = '密码错误'
            }
            ctx.response.status = 200;
            ctx.response.body = result;
        })
}
