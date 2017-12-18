import query from '../config/db_config'

/**
 * 添加文章
 * @param name  文章名称
 * @param info  文章简介
 * @param detail 文章简介
 * @return {Promise.<void>}
 */
const addPost = async (name, info, detail) => {
    let sql = `INSERT INTO post(name, info, detail) VALUES(?, ?, ?)`;
    let params = [name, info, detail];
    await query(sql, params)
}
/**
 * 显示文章
 */
const showPost = async () => {
    let sql = 'SELECT * FROM post'
    return await query(sql)
};

export {
    addPost,
    showPost
}
