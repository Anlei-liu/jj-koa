import query from '../config/db_config'

const showUser = async (account, password) => {
    let sql = `SELECT * FROM user where account='${account}' and password='${password}'`
    return await query(sql)
};
export default showUser