import { showPost } from "../../models/posts"
const practice = async ctx => {
    let page = parseInt(ctx.params.page);
    if (!page) {
        page = 1;
    }
    let postList = await showPost('1');
    const pagination = Math.ceil(postList.length / 4);
    postList = postList.splice((page - 1) * 4, 4);
    console.log(postList);
    await ctx.render('practice', {
        postList: postList,
        title: '料理方法',
        pagination: pagination,
        currentPage: page,
    })
}

export default (router) => {
    router
        .get('/practice', practice)
}
