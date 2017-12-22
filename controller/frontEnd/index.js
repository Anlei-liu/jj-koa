import { showPost } from "../../models/posts"
import { queryProductAll } from "../../models/product"

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
    postList = postList.sort(objectSort('id', true))
    postList = postList.splice(0, 5);
    await ctx.render('home', {
        postList: postList,
        title: '123123'
    })
};

const product = async ctx => {
    const productList = await queryProductAll(false);
    await ctx.render('product', {
        productList: productList,
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
    console.log(postList);
    await ctx.render('practice', {
        postList: postList,
        title: '料理方法',
        pagination: pagination,
        currentPage: page,
    })
}

const contact = async ctx => {
    await ctx.render('contact', {
        title: '123123'
    })
}

const companyProfile = async ctx => {
    await ctx.render('company-profile', {
        title: '123123'
    })
}

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

const fishCake = async ctx => {
    await ctx.render('fish-cake', {
        title: '123123'
    })
}

export default (router) => {
    router
        .get('/', home)
        .get('/product', product)
        .get('/practice', practice)
        .get('/contact', contact)
        .get('/company-profile', companyProfile)
        .get('/company-dynamics', companyDynamics)
        .get('/company-dynamics/:page', companyDynamics)
        .get('/fish-cake', fishCake)
}
