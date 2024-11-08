import express from "express";
import APIRoutes from "./api/routes"; // Importa as rotas

const app = express()

// Usa as rotas da API sob o prefixo "/api"
app.use("/api", APIRoutes)


app.listen(8000, () => {
    console.log("Servidor rodando em http://localhost:8000");
  })