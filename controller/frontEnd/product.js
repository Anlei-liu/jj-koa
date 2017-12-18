const product = async ctx => {
    await ctx.render('product', {
        title: '123123'
    })
}

export default (router) => {
    router
        .get('/product', product)
}