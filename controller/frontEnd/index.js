import { showPost, queryPostOne } from "../../models/posts"
import { queryProductAll } from "../../models/product"
import { saveContact } from '../../models/modules'
import { queryCompany } from '../../models/manage'
function objectSort(property, desc) { //降序排列
    if (desc) {
        return function (a, b) {
            return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
        }
    }
    return function (a, b) {
        return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    }
}

const home = async ctx => {
    let postList = await showPost(0);
    const company = await queryCompany();
    postList = postList.sort(objectSort('id', true))
    postList = postList.splice(0, 5);
    await ctx.render('home', {
        postList: postList,
        company: company[0],
        title: '123123'
    })
};

const product = async ctx => {
    const productList = await queryProductAll(false);
    const company = await queryCompany();
    await ctx.render('product', {
        productList: productList,
        company:company[0],
        title: '产品列表'
    })
};

const practice = async ctx => {
    let page = parseInt(ctx.params.page);
    if (!page) {
        page = 1;
    }
    let postList = await showPost('1');
    const pagination = Math.ceil(postList.length / 4);
    postList = postList.splice((page - 1) * 4, 4);
    const company = await queryCompany();
    await ctx.render('practice', {
        postList: postList,
        title: '料理方法',
        pagination: pagination,
        currentPage: page,
        company:company[0]
    })
}

const contact = async ctx => {
    const company = await queryCompany();
    await ctx.render('contact', {
        title: 'contact',
        company:company[0]
    })
}

const saveContactRot = async (ctx, next) => {
    const { name, email, theme, details } = ctx.request.body
    try {
        await saveContact(name, email, theme, details )
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

const companyProfile = async ctx => {
    const company = await queryCompany();
    await ctx.render('company-profile', {
        title: '123123',
        company:company[0]
    })
}

const companyDynamics = async ctx => {
    let page = parseInt(ctx.params.page);
    if (!page) {
        page = 1;
    }
    let postList = await showPost('0');
    const pagination = Math.ceil(postList.length / 4);
    const company = await queryCompany();
    postList = postList.splice((page - 1) * 4, 4);
    console.log(postList);
    await ctx.render('company-dynamics', {
        postList: postList,
        title: '公司动态',
        pagination: pagination,
        currentPage: page,
        company:company[0]
    })
}

const fishCake = async ctx => {
    const company = await queryCompany();
    await ctx.render('fish-cake', {
        title: '123123',
        company:company[0]
    })
}

const content = async ctx => {
    const company = await queryCompany();
    const { id } = ctx.params;
    let result = await queryPostOne(id)
    result = result[0];
    await ctx.render('content', {
        result: result,
        title: 'details',
        company:company[0]
    })
}

export default (router) => {
    router
        .get('/', home)
        .get('/product', product)
        .get('/practice', practice)
        .get('/contact', contact)
        .post('/contact', saveContactRot)
        .get('/company-profile', companyProfile)
        .get('/company-dynamics', companyDynamics)
        .get('/company-dynamics/:page', companyDynamics)
        .get('/fish-cake', fishCake)
        .get('/content/:id', content)
}