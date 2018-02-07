import query from '../config/db_config'
import { foamtTime } from '../utils'

`CREATE TABLE jj.slider ( id INT NOT NULL AUTO_INCREMENT ,
                          mainTitle VARCHAR(300) NULL ,
                          subTitle VARCHAR(300) NULL , 
                          cover VARCHAR(300) NOT NULL , 
                          foreignChain VARCHAR(1000) NULL , 
                          video VARCHAR(300) NULL , 
                          type INT NOT NULL
                          time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                          PRIMARY KEY (id)) 
                          ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_bin;
                          `;

const saveContact = async (name, email, theme, details) => {
    const sql = `INSERT INTO contact(name, email, theme, details) VALUES (?,?,?,?)`;
    const params = [name, email, theme, details];
    await query(sql, params)
};

const queryContactAll = async() => {
    const sql = `SELECT * FROM contact ORDER BY id DESC`;
    let result = await query(sql)
    foamtTime(result)
    return result
}

const addSlide = async(mainTitle, subTitle, cover, foreignChain, video, type) => {
    let sql = ``;
    let params = [];
    if (mainTitle !== '') {
        sql = `INSERT INTO slider(mainTitle, subTitle, cover, type) VALUES (?, ?, ?, ?)`
        params = [mainTitle, subTitle, cover, type];
    }else if (video !== '') {
        sql = `INSERT INTO slider(cover, video, type) VALUES (?, ?, ?)`;
        params = [cover, video, type]
    }else {
        sql = `INSERT INTO slider(cover, type) VALUES (?, ?)`
        params = [cover, type]
    }
    return await query(sql, params);
}

const delSlide = async(id) => {
    const sql = `DELETE FROM slider WHERE id='${id}'`;
    return await query(sql);
}

const updateSlide = async(id, mainTitle, subTitle, cover, foreignChain, video) => {
    if (!video) {
        video = '1';
    }
    const sql = `UPDATE slider SET 
                mainTitle='${mainTitle}',
                subTitle='${subTitle}',
                cover='${cover}',
                video='${video}'
                WHERE id=${id}`;
    return await query(sql);
}

const querySlide = async(type) => {
    let sql = ``;
    if (type >= 0) {
        sql = `SELECT * FROM slider WHERE type=${type} ORDER BY id DESC`
    }else {
        sql = `SELECT * FROM slider ORDER BY id DESC`
    }
    const result = await query(sql);
    foamtTime(result)
    return result
}

const querySlideOne = async(id) => {
    let sql = `SELECT * FROM slider WHERE id=${id}`
    const result = await query(sql);
    foamtTime(result)
    return result
}

export {
    saveContact,
    queryContactAll,
    addSlide,
    delSlide,
    updateSlide,
    querySlide,
    querySlideOne
}
