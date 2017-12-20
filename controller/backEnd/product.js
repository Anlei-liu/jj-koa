import { showPost } from '../../models/user'

/**
 * 渲染文章列表页
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const renderProduct = async (ctx, next) => {
    await ctx.render('backEnd/product', {
        title: 'product'
    })
};

export default (router) => {
    router
        .get('/product', renderProduct)
}
