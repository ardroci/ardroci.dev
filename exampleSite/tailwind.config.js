const toml = require("toml");
const fs = require("fs");
const path = require("path");
const configPath = path.join(__dirname, "hugo.toml");
const getConfig = fs.readFileSync(configPath, "utf8");
const theme = JSON.parse(JSON.stringify(toml.parse(getConfig)));

let font_base = Number(theme.params.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.params.fonts.font_size.scale);
let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;
let fontPrimary, fontPrimaryType, fontSecondary, fontSecondaryType;
if (theme.params.fonts.font_family.primary) {
  fontPrimary = theme.params.fonts.font_family.primary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontPrimaryType = theme.params.fonts.font_family.primary_type;
}
if (theme.params.fonts.font_family.secondary) {
  fontSecondary = theme.params.fonts.font_family.secondary
    .replace(/\+/g, " ")
    .replace(/:[ital,]*[ital@]*[wght@]*[0-9,;]+/gi, "");
  fontSecondaryType = theme.params.fonts.font_family.secondary_type;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./hugo_stats.json"],
  safelist: [{ pattern: /^swiper-/ }],
  darkMode: "class",
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        text: theme.params.colors.default.text_color.default,
        light: theme.params.colors.default.text_color.light,
        dark: theme.params.colors.default.text_color.dark,
        primary: theme.params.colors.default.theme_color.primary,
        secondary: theme.params.colors.default.theme_color.secondary,
        body: theme.params.colors.default.theme_color.body,
        border: theme.params.colors.default.theme_color.border,
        "theme-light": theme.params.colors.default.theme_color.theme_light,
        "theme-dark": theme.params.colors.default.theme_color.theme_dark,
        darkmode: {
          text: theme.params.colors.darkmode.text_color.default,
          light: theme.params.colors.darkmode.text_color.light,
          dark: theme.params.colors.darkmode.text_color.dark,
          primary: theme.params.colors.darkmode.theme_color.primary,
          secondary: theme.params.colors.darkmode.theme_color.secondary,
          body: theme.params.colors.darkmode.theme_color.body,
          border: theme.params.colors.darkmode.theme_color.border,
          "theme-light": theme.params.colors.darkmode.theme_color.theme_light,
          "theme-dark": theme.params.colors.darkmode.theme_color.theme_dark,
        },
      },
      fontSize: {
        base: font_base + "px",
        h1: h1 + "rem",
        "h1-sm": h1 * 0.8 + "rem",
        h2: h2 + "rem",
        "h2-sm": h2 * 0.8 + "rem",
        h3: h3 + "rem",
        "h3-sm": h3 * 0.8 + "rem",
        h4: h4 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: {
        primary: [fontPrimary, fontPrimaryType],
        secondary: [fontSecondary, fontSecondaryType],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({
      generateContainer: false,
      gridGutterWidth: "2rem",
      gridGutters: {
        1: "0.25rem",
        2: "0.5rem",
        3: "1rem",
        4: "1.5rem",
        5: "3rem",
      },
    }),
  ],
};