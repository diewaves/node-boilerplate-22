// Integración con Prismic
import path from 'path'
import express from 'express'
import { fileURLToPath } from 'url'
import * as prismic from '@prismicio/client'
import * as prismicH from '@prismicio/helpers'
import { client } from './config/prismicConfig.js'

const app = express()
const port = 3000

app.set('view engine', 'pug') // Utilizamos PUG como motor de renderizado de vistas
const __dirname = path.dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, 'views')))

// Middleware son funciones que permiten acceder al endpoint y obtener la información de un objeto
app.use((req, res, next) => {
  res.locals.ctx = {
    prismicH
  }
  next()
})

app.get('/', async (req, res) => {
  // Obtención de datos de prismic para cada vista
  const document = await client.get({ predicates: prismic.predicate.any('document.type', ['home', 'meta']) })
  const { results } = document // Creamos un constructor. Desestructuración de javascript
  const [meta, home] = results // Deconstruimos el array en un objeto
  res.render('pages/home', { // Renderizamos cada respuesta
    meta,
    home
  })
})

app.get('/about', async (req, res) => {
  // Obtención de datos de prismic para cada vista
  const document = await client.get({ // Uno de los valores de documnet es results
    predicates: prismic.predicate.any('document.type', ['about', 'meta'])
  })
  const { results } = document // Creamos un constructor para sacar el array con el objeto que queremos. Desestructuración de javascript
  const [meta, about] = results // Deconstruimos el objeto en un array y los nombramos por el orden que necesitamos
  // console.log(document)
  // console.log(results)
  // console.log(meta)
  res.render('pages/about', { // Renderizamos cada respuesta
    meta,
    about
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
