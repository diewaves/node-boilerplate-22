import path from "path";
import { merge } from "webpack-merge";
import { fileURLToPath } from "url";
import config from "./webpack.config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
