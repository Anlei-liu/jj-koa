import { addProduct } from "../../models/product"
/**
 * 渲染文章列表页
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const renderProduct = async (ctx, next) => {
    await ctx.render('backEnd/product', {
        title: 'product'
    })
};

const productAdd = async (ctx, next) => {
    await ctx.render('backEnd/productEdit', {
        pId: '',
        pTitle: '',
        image: '',
        type: '',
        title: 'add product'
    })
};

const saveProduct = async (ctx, next) => {
    console.log(ctx.request.body)
    const { title, cover, type } = ctx.request.body
    await addProduct(title, cover, type)
    ctx.response.status = 200;
    ctx.response.body = {
        code: 1,
        msg: 'success'
    }
}

export default (router) => {
    router
        .get('/product/list', renderProduct)
        .get('/product/add', productAdd)
        .post('/product/add', saveProduct)
}
