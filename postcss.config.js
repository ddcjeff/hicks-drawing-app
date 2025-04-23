// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    '@tailwindcss/postcss': {}, // 👈 Add this line
  },
};
