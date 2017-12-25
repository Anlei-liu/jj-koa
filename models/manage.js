import query from '../config/db_config'

const saveCompany = async(address, email, evaluate, fax, idea, intro, tel) => {
    const sql = `UPDATE company SET
                idea='${idea}',
                address='${address}',
                tel='${tel}',
                fax='${fax}',
                email='${email}',
                intro='${intro}',
                evaluate='${evaluate}'
                 WHERE 1`;
    await query(sql)
};

const queryCompany = async () => {
    const sql = `SELECT * FROM company WHERE 1`;
    return await query(sql)
};

export {
    saveCompany,
    queryCompany
}