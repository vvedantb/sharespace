import postcssImport from "postcss-import";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import shadowPluginV3 from "./postcss-shadow-plugin-v3.mjs";

const config = {
  plugins: [postcssImport(), shadowPluginV3(), tailwindcss(), autoprefixer()],
};

export default config;
