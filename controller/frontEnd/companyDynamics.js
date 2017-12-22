import { showPost } from "../../models/posts"
const companyDynamics = async ctx => {
    let page = parseInt(ctx.params.page);
    if (!page) {
        page = 1;
    }
    let postList = await showPost('0');
    const pagination = Math.ceil(postList.length / 4);
    postList = postList.splice((page - 1) * 4, 4);
    console.log(postList);
    await ctx.render('company-dynamics', {
        postList: postList,
        title: '公司动态',
        pagination: pagination,
        currentPage: page,
    })
}

export default (router) => {
    router
        .get('/company-dynamics', companyDynamics)
        .get('/company-dynamics/:page', companyDynamics)
}
