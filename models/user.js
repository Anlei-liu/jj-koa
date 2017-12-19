import query from '../config/db_config'

const showUser = async (account, password) => {
    let sql = `SELECT password,token FROM user where account='${account}'`
    return await query(sql)
};
const selectToken = async (token) => {
    let sql = `SELECT token FROM user where token='${token}'`
    return await query(sql)
}
export {
    showUser,
    selectToken
}
