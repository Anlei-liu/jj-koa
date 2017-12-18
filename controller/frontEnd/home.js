const home = async ctx => {
    await ctx.render('home', {
        title: '123123'
    })
};

export default (router) => {
    router
        .get('/', home)
}