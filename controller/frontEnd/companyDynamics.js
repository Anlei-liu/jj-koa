import { showPost } from "../../models/posts"
const companyDynamics = async ctx => {
    let page = ctx.query;
    console.log(page)
    if (!page) {
        page = 1;
    }
    const postList = await showPost('公司动态', page, 4);
    const pagination = 3;
    // const pagination = Math.ceil(postList.length / 4);
    await ctx.render('company-dynamics', {
        postList: postList,
        title: '123123',
        pagination: pagination,
        currentPage: page,
    })
}

export default (router) => {
    router
        .get('/company-dynamics', companyDynamics)
        .get('/company-dynamics/:id', companyDynamics)
}
