const contact = async ctx => {
    await ctx.render('contact', {
        title: '123123'
    })
}

export default (router) => {
    router
        .get('/contact', contact)
}