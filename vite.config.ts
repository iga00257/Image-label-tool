import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Icons from 'unplugin-icons/vite'

// https://vitejs.dev/config/
// https://icon-sets.iconify.design/mdi/
export default defineConfig({
  plugins: [react(), Icons({ compiler: 'jsx', jsx: 'react' })],
})
