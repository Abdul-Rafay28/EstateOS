export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { 
      globals: { ...globals.browser, ...globals.node } 
    },
    rules: {
      "no-undef": "off"
    }
  },
  pluginReact.configs.flat.recommended,
]);