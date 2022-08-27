// node-fetch se usa para hacer peticiones a la API Rest de Prismic, ahora es necesario en proyectos con node
// Con type module no se pueden hacer require, todo es import
import fetch from 'node-fetch'
import * as prismic from '@prismicio/client'

const repoName = process.env.PRISMIC_ENDPOINT // Tu repositorio o endpoint
const accessToken = process.env.PRISMIC_ACCESS_TOKEN // Token del repositorio

// Las rutas son el Resolver con la estructura de páginas de la web
// Actualiza los Custom types de tu proyecto y reflejalo aquí
const routes = [
  {
    type: 'page',
    path: '/:uid'
  }
]

export const client = prismic.createClient(repoName, {
  fetch,
  accessToken,
  routes
})
