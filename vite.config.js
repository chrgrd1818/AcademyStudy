"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vite_1 = require("vite");
var plugin_vue_1 = require("@vitejs/plugin-vue");
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
    plugins: [(0, plugin_vue_1.default)()],
    base: '/AcademyStudy/', // GitHub Pages base path
    server: {
        port: 5174
    }
});
