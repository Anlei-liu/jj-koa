import { showPost } from '../../models/user'

export default (router) => {
    router
        .get('/posts', async (ctx, next) => {
            await ctx.render('backEnd/posts', {
                title: 'posts'
            })
        })
}
