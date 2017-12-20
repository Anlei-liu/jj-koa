import query from '../config/db_config'

/**
 * 添加文章
 * @param name  文章名称
 * @param info  文章简介
 * @param details 文章简介
 * @return {Promise.<void>}
 */
const addPost = async (name, info, details) => {
    let sql = `INSERT INTO post(title, intro, details) VALUES(?, ?, ?)`;
    let params = [name, info, detail];
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
        sql = `SELECT * FROM post WHERE type='${ type }' limit ${(page - 1) * limit},${limit - 1}`
    }else {
        sql = `SELECT * FROM post limit ${(page - 1) * limit},${limit - 1}`
    }
    return await query(sql)
};

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
 * @param intro  文章简介
 * @param details 文章详情
 * @return {Promise.<void>}
 */
const updatePost = async (id, title, intro, details) => {
    let sql = `UPDATE post SET title='${title}', info='${intro}' details='${details}' WHERE id='${id}'`;
    return await query(sql);
}
export {
    addPost,
    showPost,
    delPost,
    updatePost
}
