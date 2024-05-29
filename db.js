const { Pool } = require("pg");

const config = { 
    user: process.env.USER, 
    host: process.env.HOST, 
    database: process.env.DATABASE, 
    password: process.env.PASS, 
    port: process.env.PORT, 
} 

const pool = new Pool(config);

const insertar = async (payload) =>
{
    const text = `INSERT INTO post(usuario, url, descripcion, likes) VALUES($1, $2, $3, $4) RETURNING *`;
    const values = [payload.usuario, payload.URL, payload.descripcion, 0]

    const queryObject = {
        text : text,
        values : values
    }

    const result = await pool.query(queryObject)
    return result
}

const buscarPosts = async () =>
{
    const text = `SELECT * FROM post`;

    const queryObject = {
        text : text,
        values : []
    }

    const result = await pool.query(queryObject);
    return result;
}

const editarPost = async (dato) =>
{
    const text = "UPDATE post SET likes = likes + 1 WHERE id = $1";
    const values = [dato.id];

    const queryObject = {
        text : text,
        values : values
    }

    const result = await pool.query(queryObject);
    return result;
}

module.exports = { insertar, buscarPosts, editarPost };