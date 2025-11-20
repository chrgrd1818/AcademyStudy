import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: '/AcademyStudy/', // GitHub Pages base path
    server: {
        port: 5174
    }
})
