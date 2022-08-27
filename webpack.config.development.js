import path from "path";
import { merge } from "webpack-merge";
import config from "./webpack.config.js";

export default merge(config, {
  // Exportamos los modulos que nos interesan en objetos
  mode: "development", // Modo desarrollo activado
  devtool: "inline-source-map",
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },

  output: {
    path: path.resolve(__dirname, "public"), // En esta carpeta va a alojar los archivos compilados mientras desarrollamos
  },
});
