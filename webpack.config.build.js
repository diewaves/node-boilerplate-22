import path from "path";
import { merge } from "webpack-merge";
import config from "./webpack.config.js";

export default merge(config, {
  mode: "production", // Modo producción

  output: {
    path: path.resolve(__dirname, "public"), // En esta carpeta va a alojar los archivos compilados mientras desarrollamos
  },
});
