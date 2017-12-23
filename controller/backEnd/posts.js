import {
    addPost,
    delPost,
    queryPostOne,
    updatePost
} from "../../models/posts"
/**
 * 渲染文章列表页
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const renderPosts = async (ctx, next) => {
    await ctx.render('backEnd/posts', {
        title: 'posts'
    })
};

/**
 * 渲染文章修改页
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const renderPostEdit = async (ctx, next) => {
    const id = ctx.params.id;
    let post = await queryPostOne(id);
    console.log(post[0].title)
    await ctx.render('backEnd/postsEdit', {
        postId: post[0].id,
        postTitle: post[0].title,
        postIntro: post[0].intro,
        posttype: post[0].type,
        image: post[0].cover,
        postDetails: post[0].details,
        title: 'posts'
    })
};

const renderPostAdd = async (ctx, next) => {
    await ctx.render('backEnd/postsEdit', {
        postId: '',
        postTitle: '',
        postIntro: '',
        posttype: '',
        image: '',
        postDetails: '',
        title: 'add post'
    })
};

const addPostRou = async (ctx, next) => {
    console.log(ctx.request.body);
    const { title, type, cover, intro, details }  = ctx.request.body;
    try {
        await addPost(title, type, cover, intro, details);
        ctx.response.status = 200;
        ctx.response.body = {
            code: 1,
            msg: 'success',
        }
    }catch(e) {
        ctx.response.status = 200;
        ctx.response.body = {
            code: 0,
            msg: 'error',
        }
    }
}

/**
 * 删除文章
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const delPostRou = async (ctx, next) => {
    const { id }  = ctx.request.body;
    try {
        await delPost(id);
    }catch (e) {

    }
    ctx.response.status = 200;
    ctx.response.body = {
        code: 1,
        msg: 'success'
    }
};

const updatePostRot = async (ctx, next) => {
    const { id, title, type, cover, intro, details } = ctx.request.body;
    await updatePost(id, title, type, cover, intro, details)
    try {
        ctx.response.body = {
            code: 1,
            msg: 'success'
        }
    }catch (e) {
        ctx.response.body = {
            code: 0,
            msg: 'error'
        }
    }
    ctx.response.status = 200;

};

export default (router) => {
    router
        .get('/posts', renderPosts)
        .get('/post/edit/:id', renderPostEdit)
        .get('/post/add', renderPostAdd)
        .post('/post/add', addPostRou)
        .delete('/post', delPostRou)
        .put('/post', updatePostRot)
}
