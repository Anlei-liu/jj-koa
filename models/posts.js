import query from '../config/db_config'

/**
 * 添加文章
 * @param title  文章名称
 * @param intro  文章简介
 * @param type  文章类型
 * @param cover  文章封面
 * @param details 文章简介
 * @return {Promise.<void>}
 */
const addPost = async (title, type, cover, intro, details) => {
    let sql = `INSERT INTO post(title, type, cover, intro, details) VALUES(?, ?, ?, ?, ?)`;
    let params = [title, type, cover, intro, details];
    await query(sql, params)
}

/**
 * 查询文章
 * @param type  文章类型
 * @param page  第几页
 * @param limit 一页几张
 * @return {Promise.<*>}
 */
const showPost = async (type, page, limit) => {
    let sql = '';
    if (type) {
        sql = `SELECT * FROM post WHERE type='${ type }' ORDER BY id DESC`
    }else {
        sql = `SELECT * FROM post`
    }
    let result = await query(sql);
    result.forEach((item) => {
        if (item.type === 0) {
            return item.type = '公司动态';
        }else if(item.type === 1) {
            return item.type = '料理方法';
        }
    });
    return result
};

const queryPostOne = async (id) => {
    let sql = `SELECT * FROM post WHERE id='${id}'`
    return query(sql)
}

/**
 * 查询最后一条文章ID
 * @return {Promise.<*>}
 */
const selectPostId = async () => {
    let sql = `SELECT MAX(id) as maxId FROM post`
    return await query(sql)
}

/**
 * 删除文章
 * @param id  文章ID
 * @return {Promise.<*>}
 */
const delPost = async (id) => {
  let sql = `DELETE FROM post WHERE id='${id}'`;
  return await query(sql);
};

/**
 * 更新文章
 * @param id   文章ID
 * @param title 文章标题
 * @param type 文章类型
 * @param cover 文章封面
 * @param intro  文章简介
 * @param details 文章详情
 * @return {Promise.<void>}
 */
const updatePost = async (id, title, type, cover, intro, details) => {
    let sql = `UPDATE post SET 
                title='${title}', 
                type='${type}',
                cover='${cover}',
                intro='${intro}',
                details='${details}'
                WHERE id='${id}'`;
    return await query(sql);
}
export {
    addPost,
    showPost,
    updatePost,
    selectPostId,
    delPost,
    queryPostOne,
}
