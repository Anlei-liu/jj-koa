const practice = async ctx => {
    await ctx.render('practice', {
        title: '123123'
    })
}

export default (router) => {
    router
        .get('/practice', practice)
}