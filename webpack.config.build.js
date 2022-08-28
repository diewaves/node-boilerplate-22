import path from "path";
import { merge } from "webpack-merge";
import { fileURLToPath } from "url";
import config from "./webpack.config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default merge(config, {
  mode: "production", // Modo producción

  output: {
    path: path.resolve(__dirname, "public"), // En esta carpeta va a alojar los archivos compilados mientras desarrollamos
  },
});
