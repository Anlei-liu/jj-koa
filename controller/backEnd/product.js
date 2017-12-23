import {
    addProduct,
    delProduct,
    queryProductOne
} from "../../models/product"
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

const delProductRou = async (ctx, next) => {
    const { id }  = ctx.request.body;
    console.log(id)
    try {
        await delProduct(id);
        ctx.response.status = 200;
        ctx.response.body = {
            code: 1,
            msg: 'success'
        }
    }catch (e) {
        console.log(e)
    }
}

const productEdit = async (ctx, next) => {
    const id = ctx.params.id;
    const product = await queryProductOne(id);
    await ctx.render('backEnd/productEdit', {
        pId: product[0].id,
        pTitle: product[0].title,
        image: product[0].cover,
        type: product[0].type,
        title: 'edit product'
    })
}

export default (router) => {
    router
        .get('/product/list', renderProduct)
        .delete('/product/delete', delProductRou)
        .get('/product/add', productAdd)
        .post('/product/add', saveProduct)
        .get('/product/edit/:id', productEdit)
}
