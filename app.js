// Integración con Prismic
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import * as prismicH from "@prismicio/helpers";
import { client } from "./config/prismicConfig.js";

import "dotenv/config";

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
  const document = await client.getFirst();
  res.render("page", { document });
});

app.get("/about", async (req, res) => {
  // Obtención de datos de prismic para cada vista
  const document = await client.get({
    predicates: prismic.predicates.any("document.type", ["about", "meta"]),
  });
  res.render("page", { document });
});

// app.get('/', async (req, res) => {
//   res.render('base', { // De esta forma podemos renderizar un archivo de pug y pasarle datos en un objeto
//     meta: {
//       data: {
//         title: '',
//         description: ''
//       }
//     }
//   })
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
