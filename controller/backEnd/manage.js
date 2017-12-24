import { saveCompany, queryCompany } from '../../models/manage'

const company = async (ctx, next) => {
    const _result = await queryCompany();
    await ctx.render('backEnd/company', {
        company: _result[0],
        title: 'company'
    })
};

const saveCompanyRot = async(ctx, next) => {
    const { address, email, evaluate, fax, idea, intro, tel } = ctx.request.body;
    try {
        saveCompany(address, email, evaluate, fax, idea, intro, tel)
        ctx.response.status = 200;
        ctx.response.body = {
            code: 0,
            msg: 'success'
        }
    }catch (e) {
        ctx.response.status = 200;
        ctx.response.body = {
            code: 1,
            msg: 'error'
        }
    }
}

export default (router) => {
    router
        .get('/manage/company', company)
        .post('/manage/company', saveCompanyRot)
}
