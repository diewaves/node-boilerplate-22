// Integración con Prismic
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import * as prismic from '@prismicio/client'
import * as prismicH from "@prismicio/helpers";
import { client } from "./config/prismicConfig.js";

const app = express();
const port = 3000;

app.set("view engine", "pug"); // Utilizamos PUG como motor de renderizado de vistas
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "views")));

// Middleware son funciones que permiten acceder al endpoint y obtener la información de un objeto
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH,
  };
  next();
});

app.get("/", async (req, res) => {
  // Renderizado normal
  const document = await client.getSingle("home");
  res.render("pages/home", { document });
});

app.get("/about", async (req, res) => {
  // Obtención de datos de prismic para cada vista
  const document = await client.get({
    predicates: prismic.predicate.any("document.type", ["about", "meta"]),})
  console.log(document)
  res.render("pages/about", {document});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
