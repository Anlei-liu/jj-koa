import { showUser, selectToken} from '../../models/user'
import bcrypt from 'bcryptjs'

/**
 * 渲染登陆页面
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const renderAdmin = async (ctx, next) => {
    ctx.session.token = null;
    await ctx.render('backEnd/admin', {
        title: 'login'
    })
};

/**
 * 登陆
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const login = async (ctx, next) => {
    const { account, password, remember } = ctx.request.body;
    const user = await showUser(account);
    let result = {};
    if (user.length > 0 && bcrypt.compareSync(password, user[0].password)) {
        ctx.session.token = user[0].token;
        result.code = 1;
        result.message = 'success';
    }else {
        result.code = 0;
        result.message = '密码错误'
    }
    ctx.response.status = 200;
    ctx.response.body = result;
};


export default (router) => {
    router
        .get('/admin', renderAdmin)
        .post('/admin', login)
}
