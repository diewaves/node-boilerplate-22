const path = require('path') // Simplifica la busqueda de rutas
const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin') // Copia los archivos al build
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // Minifica y optimiza el css
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin') // Optimiza imagenes
const TerserPlugin = require('terser-webpack-plugin')

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev' // Indica que usaremos Node en el entorno de desarrollo

const dirApp = path.join(__dirname, 'app') // Define una dirección para la carpeta app
const dirAssets = path.join(__dirname, 'assets')
const dirShared = path.join(__dirname, 'shared')
const dirStyles = path.join(__dirname, 'styles')
const dirNode = 'node_modules'

module.exports = {
  entry: [
    path.join(dirApp, 'index.js'), // Añadimos el index principal de js
    path.join(dirStyles, 'index.scss') // Añadimos el index principal de js
  ],

  resolve: {
    modules: [dirApp, dirAssets, dirShared, dirStyles, dirNode] // Esto ayuda aque en tus archivos no tengas que escribir la ruta completa y sus niveles
  },

  plugins: [
    new webpack.DefinePlugin({
      // Nos ayuda a chequear si estamos en entorno desarrollo, viene bien para lanzar mensajes solo en ese entorno
      IS_DEVELOPMENT
    }),

    new CleanWebpackPlugin(),

    // new webpack.ProvidePlugin({//Esto sirve para importar plugins automáticamente sin hacer el import o require
    //   _map:['lodash', 'map'],
    //   $: 'jquery;'
    // })

    new CopyWebpackPlugin({
      // Copia los archivos al directorio del build o public, para que sean facilmente accesibles y no haya que acordarse de en que directorio está
      patterns: [
        {
          from: './shared',
          to: ''
        }
      ]
    }),
    new MiniCssExtractPlugin({
      // Optimizado de css
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new ImageMinimizerPlugin({
      // Optimizado de imágenes
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 7 }]
          ]
        }
      }
    })
  ],

  module: {
    // Los modules sirven para buscar los archivos con la extensión y poder ubicarlos en el public folder
    rules: [
      {
        test: /\.pug$/,
        use: ['pug-loader'] // Preprocesador para lenguaje pug, que nos permite escribir html de forma muy cómoda
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader' // Usamos babel para escribir javascript moderno y que lo compile para que lo entiendan todos los navegadores
        }
      },
      {
        test: /\.(sa|sc|c)ss$/, // Busca archivos sass, scss o css
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader', // Post CSS es importante para que él solo te añada los prefijos especiales para reglas CSS de algunos navegadores como -webkit- o -moz-
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader', // Preprocesador para utilizar scss
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/, // Encuentra los archivos y los carga en el build, asi nunca te preocuparás por cambios de url
        loader: 'file-loader',
        options: {
          name (file) {
            return '[hash].[ext]'
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i, // Busca imagenes y las optimiza
        use: [
          {
            loader: ImageMinimizerPlugin.loader
          }
        ]
      },
      {
        test: /\.(glsl|frag|vert)$/, // Utilidad para lenguaje shader de webGL y dividir sus funciones
        loader: 'raw-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()] // Este plugin minifica y mejora el código para producción
  }
}
