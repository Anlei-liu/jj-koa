import {
    addProduct,
    delProduct,
    queryProductOne,
    updateCategories,
    queryCategories
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

const categories = async(ctx, next) => {
    const result = await queryCategories();
    await ctx.render('backEnd/product-categories-intro', {
        title: 'edit categories',
        categories: result[0],
    })
}

const upCategories = async(ctx, next) => {
    const { popularity, theme, advanced, giftBox } = ctx.request.body
    await updateCategories(popularity, theme, advanced, giftBox);
    ctx.response.status = 200;
    ctx.response.body = {
        code: 0,
        msg:'success'
    }
}

export default (router) => {
    router
        .get('/product/list', renderProduct)
        .delete('/product/delete', delProductRou)
        .get('/product/add', productAdd)
        .post('/product/add', saveProduct)
        .get('/product/edit/:id', productEdit)
        .get('/product/categories', categories)
        .post('/product/categories', upCategories)
}
