const fishCake = async ctx => {
    await ctx.render('fish-cake', {
        title: '123123'
    })
}

export default (router) => {
    router
        .get('/fish-cake', fishCake)
}