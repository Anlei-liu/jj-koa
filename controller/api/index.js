import { showPost } from '../../models/posts'
import { saveContact } from '../../models/modules'
import { queryProductAll } from "../../models/product"
import multer from 'koa-multer';
import oPath from 'path'
import fs from 'fs';
import routes from "../../routes";
const oUpload = multer({dest: './public/uploads/'})
/**
 * 查询文章列表
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const queryPost = async (ctx, next) => {
    const { page, limit } = ctx.request.query;
    let postList = await showPost(null);
    const len = postList.length;
    let _result = {};
    console.log(postList)
    if (len > 0) {
        postList = postList.splice((page - 1) * limit, limit);
        _result = {
            "code": 0,
            "msg": 'success',
            "count": len,
            "data": postList
        };
    }else {
        _result = {
            "code": 1,
            "msg": '数据为空',
            "count": len,
        };
    }
    ctx.response.status = 200;
    ctx.response.body = _result
};

const upload = async (ctx, next) => {
    const {originalname, path, mimetype} = ctx.req.file;
    const reader = fs.createReadStream(oPath.join(`./${path}`));
    const stream = fs.createWriteStream(oPath.join(`./public/uploads/${originalname}`));
    reader.pipe(stream);
    console.log('uploading %s -> %s', originalname, path);
    fs.unlink(path)
    ctx.response.status = 200;
    ctx.response.body = {
        code: 0,
        msg: 'success',
        url: `${ctx.origin}/uploads/${originalname}`
    }
};

const queryProduct = async (ctx, next) => {
    const { page, limit } = ctx.request.query;
    let list = await queryProductAll(null);
    const len = list.length;
    let _result = {};
    list = list.splice((page - 1) * limit, limit);
    if (len > 0) {
        _result = {
            "code": 0,
            "msg": 'success',
            "count": len,
            "data": list
        };
    }else {
        _result = {
            "code": 1,
            "msg": '数据为空',
            "count": len
        };
    }
    ctx.response.status = 200;
    ctx.response.body = _result
}

export default (router) => {
    router
        .get('/post', queryPost)
        .get('/product', queryProduct)
        .post('/upload', oUpload.single('file'), upload)
}
