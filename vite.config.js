import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
    hmr: {
      protocol: 'wss',
      clientPort: 443,
      host: "https://blank-09-opulent-waddle-x4rj4grqp473v7p5-5173.preview.app.github.dev/"
    }
   }
})
