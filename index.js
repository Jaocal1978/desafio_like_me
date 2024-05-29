const express = require("express");
const app = express();
const { insertar, buscarPosts, editarPost } = require('./db');

app.listen(3000, () =>
{
    console.log("Conectado al Servidor 3000");
})

app.use(express.json());

app.get("/", async (req, res) =>
{
    res.sendFile(__dirname + "/index.html");
})

app.post("/post", async (req, res) =>
{
    const payload = req.body;

    try 
    {
        const response = await insertar(payload);
        res.send(response.rows);
    } 
    catch (error) 
    {
        res.statusCode = 500
        res.json({error: 'No fue posible guardar el post'})
    }
})

app.get("/posts", async (req, res) =>
{
    try 
    {
        const response = await buscarPosts();
        res.json(response.rows);
    } 
    catch (error) 
    {
        res.statusCode = 500
        res.json({error: "No es posible ver los post"})
    }
})

app.put("/post", async (req, res) =>
{
    const id = req.query;

    try 
    {
        const response = await editarPost(id);
        res.send(response.rows);
    } 
    catch (error) 
    {
        res.statusCode = 500
        res.json({error: 'No fue posible dar like al post.'})
    }
})