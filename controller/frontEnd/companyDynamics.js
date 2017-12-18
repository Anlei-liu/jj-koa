const companyDynamics = async ctx => {
    await ctx.render('company-dynamics', {
        title: '123123'
    })
}

export default (router) => {
    router
        .get('/company-dynamics', companyDynamics)
}