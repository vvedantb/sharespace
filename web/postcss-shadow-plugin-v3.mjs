/**
 * shadow-plugin 1.x ships Tailwind v4 `@utility` / `@theme` CSS.
 * This repo is Tailwind v3, so rewrite those at-rules into real classes
 * before Tailwind/PostCSS emit the stylesheet.
 *
 * @type {import('postcss').PluginCreator}
 */
import postcss from "postcss";

function shadowPluginV3() {
  return {
    postcssPlugin: "shadow-plugin-v3",
    Once(root) {
      root.walkAtRules("theme", (atRule) => {
        const rule = postcss.rule({ selector: ":root" });
        rule.append(atRule.nodes);
        atRule.replaceWith(rule);
      });

      root.walkAtRules("utility", (atRule) => {
        const name = atRule.params.trim();
        if (!name || name.includes("*")) {
          atRule.remove();
          return;
        }

        const rule = postcss.rule({ selector: `.${name}` });
        rule.append(atRule.nodes);
        const layer = postcss.atRule({ name: "layer", params: "utilities" });
        layer.append(rule);
        atRule.replaceWith(layer);
      });
    },
  };
}

shadowPluginV3.postcss = true;

export default shadowPluginV3;
