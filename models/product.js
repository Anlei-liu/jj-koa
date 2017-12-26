import query from "../config/db_config";
import { foamtTime } from '../utils'
const addProduct = async (title, cover, type) => {
    let sql = `INSERT INTO product(cover, title, type) VALUES(?, ?, ?)`;
    let params = [cover, title, type];
    return await query(sql, params)
};

const delProduct = async (id) => {
    let sql = `DELETE FROM product WHERE id='${id}'`;
    return await query(sql)
};

const updateProduct = async (id, type, cover, title) => {
    let sql = `UPDATE post SET 
                title='${title}', 
                type='${type}',
                cover='${cover}',
                WHERE id='${id}'`;
    return await query(sql);
};

function changeType(result) {
    result.forEach((item) => {
        if (item.type === 0) {
            return item.type = '高级产品';
        }else if(item.type === 1) {
            return item.type = '人气产品';
        }else if(item.type === 2) {
            return item.type = '主题产品';
        }else if(item.type === 3) {
            return item.type = '礼盒套装';
        }
    });
    return result
}

const queryProductAll = async (type) => {
    let sql = '';
    if (type) {
        sql = `SELECT * FROM product WHERE type='${type}'`;
    }else {
        sql = `SELECT * FROM product`;
    }
    let result = await query(sql);
    foamtTime(result)
    return changeType(result)
};

const queryProductOne = async (id) => {
    let sql = `SELECT * FROM product WHERE id='${id}'`;
    let result = await query(sql)
    foamtTime(result)
    return changeType(result)
};

export {
    addProduct,
    delProduct,
    updateProduct,
    queryProductAll,
    queryProductOne
}
