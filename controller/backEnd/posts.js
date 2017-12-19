import { showPost } from '../../models/user'

/**
 * 渲染文章列表页
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const renderPosts = async (ctx, next) => {
    await ctx.render('backEnd/posts', {
        title: 'posts'
    })
};

/**
 * 渲染文章修改页
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const renderPostEdit = async (ctx, next) => {
    console.log(ctx.request.params);
    await ctx.render('backEnd/postsEdit', {
        title: 'posts'
    })
};


export default (router) => {
    router
        .get('/posts', renderPosts)
        .get('/posts/edit/:id', renderPostEdit)
}
