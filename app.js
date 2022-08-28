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
    predicates: prismic.predicate.any("document.type", ["about", "meta"]),
  });
  console.log(document)
  res.render("pages/about", { document });
});


// app.get('/about', async (req, res) => { // Obtención de datos de prismic para cada vista
//   initApi(req).then(api => {
//     api.query(
//       // Prismic.Predicates.at('document.type', 'about'), // Si quisieramos pasar un solo documento
//       Prismic.Predicates.any('document.type', ['meta', 'about'])).then(response => { // Este es el objeto de respuesta. Se renderiza la vista aquí
//       const { results } = response // Creamos un constructor. Desestructuración de javascript
//       const [meta, about] = results // Deconstruimos el array en un objeto
//       // console.log(results) // Esto devuelve un array con el objeto, sería lo mismo que response.results, si logeamos ahora about nos saca el objeto libre
//       res.render('pages/about', {
//         // document: response.results[0]
//         meta,
//         about // Al haber hecho la desestructuración, podemos colocar aqui el objeto directo
//       })
//     })
//   })
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
