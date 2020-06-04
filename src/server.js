const express = require('express');
const server = express();

// configurar pasta publica
server.use(express.static("public"));

// Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar caminhos da aplicação
// Página inicial
server.get("/", (req, res) => {
   return res.render("index.html");
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
})

server.get("/search", (req, res) => {
    return res.render("search-results.html");
})


// iniciar o servidor
server.listen(3000, err => {
    try {
        console.log("Server Started");
    } catch ( err ) {
        console.log(err);
    }
})