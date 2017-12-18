const companyDynamics = async ctx => {
    await ctx.render('company-profile', {
        title: '123123'
    })
}

export default (router) => {
    router
        .get('/company-profile', companyDynamics)
}