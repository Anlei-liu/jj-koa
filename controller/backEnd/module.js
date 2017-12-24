import { queryContactAll } from '../../models/modules'
const slider = async (ctx, next) => {
    await ctx.render('backEnd/slider', {
        title: 'slider'
    })
};

const contact = async (ctx, next) => {
    const result = await queryContactAll();
    await ctx.render('backEnd/contact', {
        contact: result,
        title: 'contact'
    })
};

export default (router) => {
    router
        .get('/module/slider', slider)
        .get('/module/contact', contact)
}
