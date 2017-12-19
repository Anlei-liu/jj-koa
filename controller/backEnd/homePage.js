
/**
 * 渲染主页修改
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const renderHome = async (ctx, next) => {
    await ctx.render('backEnd/homeEdit', {
        title: 'home edit'
    })
};

export default (router) => {
    router
        .get('/page/home', renderHome)
}
