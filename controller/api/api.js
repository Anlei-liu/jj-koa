import { showPost } from '../../models/posts'
import multer from 'koa-multer';
import oPath from 'path'
import fs from 'fs';
const oUpload = multer({dest: './uploads/'})
/**
 * 查询文章列表
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const queryPost = async (ctx, next) => {
    const { page, limit } = ctx.request.query;
    const postList = await showPost(null, page, limit);
    if (postList.length > 0) {
        const _result = {
            "code": 0,
            "msg": 'success',
            "count": postList.length,
            "data": postList
        };
        ctx.response.status = 200;
        ctx.response.body = _result
    }
};

/**
 * 删除文章
 * @param ctx
 * @param next
 * @return {Promise.<void>}
 */
const delPost = async (ctx, next) => {
    ctx.response.status = 200;
    ctx.response.body = {
        code: 1,
        msg: 'success'
    }
};

const upload = async (ctx, next) => {
    const {originalname, path, mimetype} = ctx.req.file;
    console.log(path)
    const reader = fs.createReadStream(oPath.join(`./${path}`));
    const stream = fs.createWriteStream(oPath.join(`./uploads/${originalname}`));
    reader.pipe(stream);
    console.log('uploading %s -> %s', originalname, path);
    fs.unlink(path)
    ctx.response.status = 200;
    ctx.response.body = {
        code: 1,
        msg: 'success'
    }
};

export default (router) => {
    router
        .get('/post', queryPost)
        .del('/post', delPost)
        .post('/upload', oUpload.single('file'), upload)
}
