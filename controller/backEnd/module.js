const slider = async (ctx, next) => {
    await ctx.render('backEnd/slider', {
        title: 'slider'
    })
};

const contact = async (ctx, next) => {
    await ctx.render('backEnd/contact', {
        title: 'contact'
    })
};

export default (router) => {
    router
        .get('/module/slider', slider)
        .get('/module/contact', contact)
}
