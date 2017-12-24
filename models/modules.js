import query from '../config/db_config'

const saveContact = async (name, email, theme, details) => {
    const sql = `INSERT INTO contact(name, email, theme, details) VALUES (?,?,?,?)`;
    const params = [name, email, theme, details];
    await query(sql, params)
};

const queryContactAll = async() => {
    const sql = `SELECT * FROM contact ORDER BY id DESC`;
    return await query(sql)
}

export {
    saveContact,
    queryContactAll
}